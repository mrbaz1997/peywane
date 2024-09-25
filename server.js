const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const wordRoutes = require('./routes/wordRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/words', wordRoutes);

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
