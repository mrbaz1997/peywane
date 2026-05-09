const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const pool = require('./config/db');  // Your database configuration

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            // Check if user exists
            const existingUser = await pool.query('SELECT * FROM users WHERE google_id = $1', [profile.id]);

            if (existingUser.rows.length > 0) {
                return done(null, existingUser.rows[0]);
            } else {
                // Create a new user in the database
                const newUser = await pool.query(
                    'INSERT INTO users (username, email, google_id) VALUES ($1, $2, $3) RETURNING *',
                    [profile.displayName, profile.emails[0].value, profile.id]
                );
                return done(null, newUser.rows[0]);
            }
        } catch (err) {
            return done(err, null);
        }
    }
));

// Serialize user into session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
    try {
        const user = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        done(null, user.rows[0]);
    } catch (err) {
        done(err, null);
    }
});

module.exports = passport;
