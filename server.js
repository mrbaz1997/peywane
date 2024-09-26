console.log("Running from directory: ", __dirname);

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path'); // Import the path module

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const wordRoutes = require('./routes/wordRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/words', wordRoutes);

// Serve static files from the React app's build directory
app.use(express.static(path.join(__dirname, 'client/build')));

// Handles any other routes by serving the React app's index.html file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
