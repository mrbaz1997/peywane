const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    const {username , email, password_hash } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password_hash, 10);
        const newUser = await pool.query(
            'INSERT INTO users (username,email, password_hash) VALUES ($1, $2,$3) RETURNING *',
            [username,email, hashedPassword]
        );
        res.json(newUser.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Sign-in route
exports.signin = async (req, res) => {
    const { email, password_hash } = req.body;
    try {
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            return res.status(400).json({ error: 'User not found' });
        }

        const validPassword = await bcrypt.compare(password_hash, user.rows[0].password_hash);
        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid password' });
        }

        const token = jwt.sign({ userId: user.rows[0].id }, process.env.JWT_SECRET, {
            expiresIn: '24h',
        });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};