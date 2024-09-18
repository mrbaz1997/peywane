const express = require('express');
const { getWordsAndQuestions, submitScore, checkAnswersComplete } = require('../controllers/wordController');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/get-words', authenticateToken, getWordsAndQuestions);
router.post('/submit-answer', authenticateToken, submitScore);
router.get('/check-answers-complete', authenticateToken, checkAnswersComplete);

module.exports = router;
