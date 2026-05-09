const express = require('express');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const passport = require('./passport'); // Include Passport configuration
const authRoutes = require('./routes/authRoutes');
const wordRoutes = require('./routes/wordRoutes');

require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const app = express();

app.use(cors());
app.use(express.json());

// Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session);

app.use('/auth', authRoutes);
app.use('/words', wordRoutes);
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.get('/api/data', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
