const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

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
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
