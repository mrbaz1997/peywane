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

app.use('/auth', authRoutes);
app.use('/words', wordRoutes);

// Serve static files from the React app's build directory only in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

// Fallback for API routes that don't exist
app.use((req, res, next) => {
    res.status(404).json({ message: 'API route not found' });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
