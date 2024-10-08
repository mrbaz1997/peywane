const pool = require('../config/db');
// const { is24HoursPassed } = require('../utils/timeUtils');
let time_out = true
exports.getWordsAndQuestions = async (req, res) => {
    const userId = req.user.userId;
    try {
        console.log("2. Fetch words with `ck_score = -2`")
        const word = await pool.query(`
            SELECT w.id , w.word
            FROM words w
            WHERE length(w.word) < 6
            AND w.ck_score not in (-1,0)
            AND w.id NOT IN (select word_id from user_answers where user_id = $1 group by word_id)
            ORDER BY RANDOM()
            LIMIT 1
            `, [userId]);

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
            SELECT
                q.question_id AS question_id,
                q.passage,
                json_agg(json_build_object('id', a.id, 'text', a.answer_text)) AS answers
            FROM
                questions q
                    JOIN
                answers a ON q.id = a.question_id
            WHERE q.language_id = 1
              AND q.question_id not IN (SELECT question_id FROM user_answers WHERE user_id = $1 AND word_id = ANY($2))
            GROUP BY
                q.id, q.passage
            ORDER BY
                q.id
        `, [userId, word.id]);

        console.log("5. Return the words along with their questions")
        console.log(word.rows[0])
        res.json({ word: word.rows[0], questions: questions.rows });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.submitAnswer = async (req, res) => {
    const { word_id, questions_answers } = req.body;
    const userId = req.user.userId;
    try {
        let insertQuery = 'INSERT INTO user_answers (user_id, word_id, lang_id, question_id, answer_id) VALUES ';
        const values = [userId, word_id, 1];
        let indexer = 3
        Object.entries(questions_answers).forEach(([question, answer]) => {
            insertQuery += `($1, $2,$3, $${++indexer}, $${++indexer}),`;
            values.push(question);
            values.push(answer);
        });
        insertQuery = insertQuery.slice(0, -1); // Remove the trailing comma

        console.log(insertQuery);
        console.log(values);
        await pool.query(insertQuery,values);
        res.status(201).send('Answers inserted successfully.');
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
