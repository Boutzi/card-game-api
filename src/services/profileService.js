const pool = require("../database/db");

async function getProfileDataByEmail(email) {
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0] || null;
  } catch (error) {
    console.error("Error fetching profile data by email:", error);
    return null;
  }
}

async function createProfile(profile) {
  const { displayName, givenName, familyName, email, stack, provider } = profile;
  try {
    const result = await pool.query(
      `INSERT INTO users ("displayName", "givenName", "familyName", email, stack, provider)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [displayName, givenName, familyName, email, stack, provider]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error creating profile:", error);
    return null;
  }
}

module.exports = { getProfileDataByEmail, createProfile };
