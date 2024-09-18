const pool = require('../config/db');
const { is24HoursPassed } = require('../utils/timeUtils');
const new_word_indicator = -2
const  word_limit = 40
exports.getWordsAndQuestions = async (req, res) => {

    const userId = req.user.userId;
    try {
        console.log("1. Check if user already has an active word list")
        const result = await pool.query(
            'SELECT * FROM user_day_words WHERE user_id = $1 ORDER BY creation_date DESC LIMIT 1',
            [userId]
        );

        if (result.rows.length > 0) {
            const userDayWords = result.rows[0];

            console.log("Check if 24 hours have passed")
            if (!is24HoursPassed(userDayWords.creation_date))
            {
                console.log("Return the current word list")
                const wordIds = userDayWords.word_ids;
                const words = await pool.query('SELECT * FROM words WHERE id = ANY($1)', [wordIds]);

                console.log("Fetch 3 questions for each word (assuming you have 5 questions per word)")
                const questions = await pool.query(`
                      SELECT q.* 
                      FROM questions q
                      WHERE q.question_id not IN (SELECT question_id FROM scores WHERE user_id = $1 AND word_id = ANY($2))
                      ORDER BY q.id
                      LIMIT 3 * array_length($2, 1);
                    `, [userId, wordIds]);

                return res.json({ words: words.rows, questions: questions.rows });
            }
        }

        console.log("2. Fetch words with `ck_score = -2`")
        const wordsWithZeroScore = await pool.query(`
            SELECT w.*
            FROM words w
            WHERE w.ck_score = $1
            AND w.id NOT IN (SELECT unnest(word_ids) FROM user_day_words)
            ORDER BY RANDOM()
            LIMIT $2;
            `, [new_word_indicator,word_limit]);

        console.log(new_word_indicator);
        console.log(word_limit);
        console.log(wordsWithZeroScore);
        console.log(wordsWithZeroScore.rows);
        const words = wordsWithZeroScore.rows;

        console.log("3. If fewer than 10 words are found, add words with other `ck_score` values")
        if (words.length < 10)
        {
            const additionalWords = await pool.query(`
                SELECT w.*
                FROM words w
                WHERE w.ck_score > 1
                AND w.id NOT IN (SELECT unnest(word_ids) FROM user_day_words)
                AND w.id NOT IN ($1)  -- Exclude already fetched words
                ORDER BY RANDOM()
                LIMIT $2;`,
                [words.map(word => word.id), word_limit - words.length]);

            words.push(...additionalWords.rows);
        }

        console.log("If no words are found, handle the case")
        if (words.length < 10) {
            return res.status(404).json({ error: 'Not enough words available' });
        }

        console.log("Trim words to a maximum of new_word_indicator")
        const finalWords = words.slice(0, word_limit);
        let wordIds = finalWords.map((word) => word.id);

        console.log("4. Save the word IDs in the `user_day_words` table")
        await pool.query(
            'INSERT INTO user_day_words (user_id, word_ids) VALUES ($1, $2)',
            [userId, wordIds]
        );

        console.log("5. Fetch 5 questions for each word")
        const questions = await pool.query(`
            SELECT q.* 
            FROM questions q
            WHERE q.language_id = 1
            AND q.question_id not IN (SELECT question_id FROM scores WHERE user_id = $1 AND word_id = ANY($2))
            ORDER BY q.id
            LIMIT 5 * array_length($2, 1);
            `, [userId, wordIds]);

        console.log("6. Return the words along with their questions")
        res.json({ words: finalWords, questions: questions.rows });
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
