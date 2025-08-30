import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import User from '../models/user.js';
import Role from '../models/role.js';

//users registration logic
export async function register(req, res) {
    const { username, passwd, email } = req.body;

    if (!username || !passwd || !email) {
        return res.status(400).json({ error: 'all fields are required.' })
    };
    try {
        const saltRount = 10;
        const hashedPasswd = await bcrypt.hash(passwd, saltRount);

        const newUser = await User.create({
            username,
            email,
            passwd: hashedPasswd,
            id_user_role: 2 // defautl role
        });

        res.status(201).json({
            message: 'User successfully registered.',
            user: newUser
        });
    } catch (error) {
        if (error === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ error: 'The email or username already exists.' });
        };
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    };
};

//users login logic
export async function login(req, res) {
    const { email, passwd } = req.body;

    if (!email || !passwd) {
        return res.status(400).json({ error: 'Email and password are required' });
    };
    try {
        const user = await User.findOne({
            where: { email },
            include: [{
                model: Role,
                as: 'roles',
                attributes: ['codename'],
                through: { attributes: [] }
            }]
        });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        };

        const passwdMatch = await bcrypt.compare(passwd, user.passwd);
        if (!passwdMatch) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        };

        const token = jwt.sign(
            { id: user.id, role: user.roles.map(r => r.codename) },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: "Login successful.",
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                roles: user.roles.map(r => r.codename)
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    };
};