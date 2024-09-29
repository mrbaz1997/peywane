const express = require('express');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const cors = require('cors');


const authRoutes = require('./routes/authRoutes');
const wordRoutes = require('./routes/wordRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Define your API routes first
app.get('/api/data', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

app.use('/auth', authRoutes);
app.use('/words', wordRoutes);

// Handle all other routes and send back the React index.html
app.use(express.static(path.join(__dirname, 'client', 'build')));

// Serve the React app for any other route
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
