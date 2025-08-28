import jwt from 'jsonwebtoken';

export function verifyToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ error: 'No token provided.' });
    };

    try {
        const decoded = jwt.verify(token, process.env.JWS_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ error: 'Unauthorized: Invalid token.' });
    }
};