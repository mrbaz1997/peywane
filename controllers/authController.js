const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const { OAuth2Client } = require('google-auth-library');
const pool = require('../config/db'); // Your PostgreSQL connection pool
//const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID); // Google OAuth client

// Helper function to create a JWT token
const createToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

// Traditional Sign Up Controller
exports.signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the user already exists
        let existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user into the database
        const newUser = await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
            [username, email, hashedPassword]
        );

        // Create a token and send it
        const token = createToken(newUser.rows[0].id);
        res.json({ token });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
};

// Traditional Sign In Controller
exports.signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Compare the password
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Create a token and send it
        const token = createToken(user.rows[0].id);
        res.json({ token });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
};

// Google OAuth Controller
/*
exports.googleAuth = async (req, res) => {
    const { token, profile } = req.body;

    try {
        // Verify the token with Google
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const email = payload.email;

        // Check if the user exists in the database
        let user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (user.rows.length === 0) {
            // Create a new user if they don't exist
            user = await pool.query(
                'INSERT INTO users (username, email, google_id) VALUES ($1, $2, $3) RETURNING *',
                [profile.name, email, profile.sub]
            );
        }

        // Create a JWT token for the user
        const authToken = createToken(user.rows[0].id);
        res.json({ token: authToken });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Google authentication failed' });
    }
};
*/

// Protected route example
exports.protectedRoute = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await pool.query('SELECT * FROM users WHERE id = $1', [decoded.userId]);
        if (user.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'Protected data', user: user.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Authorization failed' });
    }
};
