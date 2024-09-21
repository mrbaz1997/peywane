const pool = require('../config/db');
// const { is24HoursPassed } = require('../utils/timeUtils');
const new_word_indicator = -2
let time_out = true
exports.getWordsAndQuestions = async (req, res) => {

    const userId = req.user.userId;
    try {
        console.log("2. Fetch words with `ck_score = -2`")
        const word = await pool.query(`
            SELECT w.*
            FROM words w
            WHERE length(w.word) < 6
            AND w.ck_score = $1
            AND w.id NOT IN (SELECT word_id FROM user_day_words)
            ORDER BY RANDOM()
            LIMIT 1
            `, [new_word_indicator]);

        console.log("3. Save the word IDs in the `user_day_words` table")
        if(time_out){
            console.log("Updating table");
            await pool.query(
                'UPDATE user_day_words set word_id = $2 WHERE user_id= $1',
                [userId, word.rows[0].id]
            );
        }
        else{
            console.log("Inserting table");
            await pool.query(
                'INSERT INTO user_day_words (user_id, word_id) VALUES ($1, $2)',
                [userId, word.rows[0].id]
            );
        }

        console.log("4. Fetch 3 questions for each word")
        const questions = await pool.query(`
            SELECT q.passage
            FROM questions q
            WHERE q.language_id = 1
            AND q.question_id not IN (SELECT question_id FROM scores WHERE user_id = $1 AND word_id = ANY($2))
            ORDER BY q.id
            LIMIT 3;
            `, [userId, word.id]);

        console.log("5. Return the words along with their questions")
        console.log(word.rows[0].word)
        res.json({ word: word.rows[0].word, questions: questions.rows });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.submitScore = async (req, res) => {
    const { word_id, question_id, score } = req.body;
    const userId = req.user.userId;
    try {
        await pool.query(
            'INSERT INTO scores (user_id, word_id, question_id, score) VALUES ($1, $2, $3, $4)',
            [userId, word_id, question_id, score]
        );
        res.json({ message: 'Score saved' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.checkAnswersComplete = async (req, res) => {
    const userId = req.user.userId;
    try {
        const result = await pool.query('SELECT COUNT(*) FROM scores WHERE user_id = $1', [userId]);
        const totalAnswers = parseInt(result.rows[0].count);
        res.json({ complete: totalAnswers >= 3 });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
