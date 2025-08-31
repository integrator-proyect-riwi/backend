import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import User from '../models/user.js';
import Role from '../models/role.js';

//users registration logic
export async function register(req, res) {
    const { username, password, email, role } = req.body;

    if (!username || !password || !email) return res.status(400).json({ error: 'all fields are required.' });
    try {
        const saltRount = 10;
        const hashedPassword = await bcrypt.hash(password, saltRount);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        const roleCodename = role && role.toLowerCase() === 'admin' ? 'admin' : 'employee';

        const roleRecords = await Role.findAll({
            where: { codename: roleCodename }
        });

        if (!roleRecords || roleRecords.length === 0) return res.status(400).json({ error: 'Roles not found.' });

        const roleRecord = roleRecords[0];

        await newUser.setRoles([roleRecord.id]);

        res.status(201).json({
            message: 'User successfully registered.',
            username: newUser.username,
            email: newUser.email,
        });
    } catch (error) {
        if (error === 'SequelizeUniqueConstraintError') return res.status(400).json({ error: 'The email or username already exists.' });
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}

//users login logic
export async function login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });
    try {
        const user = await User.findOne({
            include: [{
                model: Role,
                as: 'roles',
                attributes: ['codename'],
                through: { attributes: [] },
            }],
            where: { email, is_active: true }
        });
        if (!user) return res.status(401).json({ error: 'Invalid credentials.' });

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) return res.status(401).json({ error: 'Invalid credentials.' });

        const role = user.roles.length === 1 ? user.roles[0].codename : user.roles.map(r => r.codename);

        const token = jwt.sign(
            { id: user.id, role: role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );


        res.status(200).json({
            message: "Login successful.",
            token,
            id: user.id,
            username: user.username,
            email: user.email,
            role: role
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}

export async function logout(req, res) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(400).json({ error: 'No token provided.' });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(400).json({ error: 'Malformed token.' });
        }

        res.clearCookie('token');
        return res.status(200).json({
            message: 'Logout successful. Please remove your token in your client side'
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}