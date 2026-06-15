const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/db');

function createToken(userId) {
    return jwt.sign(
        { sub: userId },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
}

async function signUp(req, res, next) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required' });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters' });
        }

        const normalizedEmail = String(email).trim().toLowerCase();

        const existingUser = await pool.query(
            'SELECT id FROM users WHERE email = $1 LIMIT 1',
            [normalizedEmail]
        );

        if (existingUser.rowCount > 0) {
            return res.status(409).json({ message: 'Email already in use' });
        }

        const passwordHash = await bcrypt.hash(password, 12);

        const insertResult = await pool.query(
            'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email',
            [name.trim(), normalizedEmail, passwordHash]
        );

        const user = insertResult.rows[0];
        const token = createToken(user.id);

        return res.status(201).json({ token, user });
    } catch (error) {
        return next(error);
    }
}

async function signIn(req, res, next) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: 'Email and password are required' });
            }

            const normalizedEmail = String(email).trim().toLowerCase();

            const userResult = await pool.query(
                'SELECT id, name, email, password_hash FROM users WHERE email = $1 LIMIT 1',
                [normalizedEmail]
            );

            if (userResult.rowCount === 0) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            const user = userResult.rows[0];

            const passwordMatch = await bcrypt.compare(password, user.password_hash);

            if (!passwordMatch) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            const token = createToken(user.id);
            return res.status(200).json({ token, user: { id: user.id, name: user.name, email: user.email } });
        } catch (error) {
            return next(error);
        }
}

async function getMe(req, res, next) {
    try {
        const result = await pool.query(
            'SELECT id, name, email FROM users WHERE id = $1 LIMIT 1',
            [req.user.id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ user: result.rows[0] });
    } catch (error) {
        return next(error);
    }
}

module.exports = {
    signUp,
    signIn,
    getMe
};