const express = require('express');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const rateLimit = require('express-rate-limit');
const lusca = require('lusca');
const passport = require('./passport'); // Include Passport configuration
const authRoutes = require('./routes/authRoutes');
const wordRoutes = require('./routes/wordRoutes');

require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const app = express();

app.use(cors());
app.use(express.json());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per window
});

app.use(limiter);

// Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session);

// CSRF protection middleware
app.use(lusca.csrf());

app.use('/auth', authRoutes);
app.use('/words', wordRoutes);
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.get('/api/data', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

app.get('/api/csrf-token', (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
