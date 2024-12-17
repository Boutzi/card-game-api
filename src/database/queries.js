const pool = require("../database/pool");

async function getProfileDataByEmail(email, provider) {
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1 AND provider = $2", [email, provider]);

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

async function updateProfile(userId, updatedProfile) {
  const { displayName, givenName, familyName } = updatedProfile;
  try {
    const result = await pool.query(
      `UPDATE users
       SET "displayName" = $1, "givenName" = $2, "familyName" = $3
       WHERE id = $4
       RETURNING *`,
      [displayName, givenName, familyName, userId]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error updating profile:", error);
    return null;
  }
}

module.exports = { getProfileDataByEmail, createProfile, updateProfile };
