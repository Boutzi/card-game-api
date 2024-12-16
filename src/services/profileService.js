const fs = require("fs").promises;
const path = require("path");

async function getProfileData() {
  try {
    const filePath = path.join(__dirname, "..", "data", "profile.json");

    // Vérifie si le fichier existe
    await ensureFileExists(filePath);

    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error fetching profile data:", error);
    return [];
  }
}

async function saveProfileData(data) {
  try {
    const filePath = path.join(__dirname, "..", "data", "profile.json");

    // Crée le dossier parent si nécessaire
    await ensureDirectoryExists(path.dirname(filePath));

    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Error saving profile data:", error);
  }
}

// Fonction utilitaire : Vérifie si le fichier existe, sinon le crée avec un tableau vide
async function ensureFileExists(filePath) {
  try {
    await fs.access(filePath);
  } catch {
    // Le fichier n'existe pas, on le crée
    await ensureDirectoryExists(path.dirname(filePath));
    await fs.writeFile(filePath, JSON.stringify([], null, 2), "utf-8");
  }
}

// Fonction utilitaire : Crée un dossier s'il n'existe pas
async function ensureDirectoryExists(directoryPath) {
  try {
    await fs.access(directoryPath);
  } catch {
    // Le dossier n'existe pas, on le crée
    await fs.mkdir(directoryPath, { recursive: true });
  }
}

function profileSchema(id, displayName, givenName, familyName, email, stack) {
  const profileSchema = {
    id: id,
    displayName: displayName,
    givenName: givenName,
    familyName: familyName,
    email: email,
    stack: stack,
  };
  return profileSchema;
}

module.exports = { getProfileData, saveProfileData, profileSchema };
