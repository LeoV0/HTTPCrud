// Importer node-fetch dynamiquement
async function loadFetch() {
  const { default: fetch } = await import("node-fetch");
  return fetch;
}

const API_URL = "http://localhost:3000";

async function getLanguages() {
  try {
    const fetch = await loadFetch();
    const response = await fetch(`${API_URL}/languages`);
    console.log("Response: ", response);
    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status}`);
    }
    const data = await response.json();
    console.log("Langages reçus:", data);
    return data.languages;
  } catch (error) {
    console.log("Erreur dans getLanguages:", error.message);
    throw error;
  }
}

async function addLanguage(language) {
  if (!language || typeof language !== "string" || language.trim() === "") {
    console.error("Erreur: Veuillez fournir un langage valide");
    return;
  }
  try {
    const fetch = await loadFetch();
    const response = await fetch(`${API_URL}/languages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ language }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Erreur lors de l’ajout");
    }
    console.log("Langage ajouté:", data);
  } catch (error) {
    console.error("Erreur:", error.message);
  }
}

async function updateLanguage(oldLanguage, newLanguage) {
  if (
    !oldLanguage ||
    !newLanguage ||
    typeof oldLanguage !== "string" ||
    typeof newLanguage !== "string" ||
    oldLanguage.trim() === "" ||
    newLanguage.trim() === ""
  ) {
    console.error("Erreur: Veuillez fournir des langages valides");
    return;
  }
  try {
    const fetch = await loadFetch();
    const response = await fetch(`${API_URL}/languages/${oldLanguage}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ language: newLanguage }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Erreur lors de la mise à jour");
    }
    console.log("Langage mis à jour:", data);
  } catch (error) {
    console.error("Erreur:", error.message);
  }
}

async function deleteLanguage(language) {
  if (!language || typeof language !== "string" || language.trim() === "") {
    console.error("Erreur: Veuillez fournir un langage valide");
    return;
  }
  try {
    const fetch = await loadFetch();
    const response = await fetch(`${API_URL}/languages`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ language }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Erreur lors de la suppression");
    }
    console.log("Langage supprimé:", data);
  } catch (error) {
    console.error("Erreur:", error.message);
  }
}

async function testAPI() {
  try {
    console.log("=== Test de l'API ===");
    await getLanguages();
    await addLanguage("javascript");
    await getLanguages();
    await updateLanguage("javascript", "python");
    await getLanguages();
    await deleteLanguage("python");
    await getLanguages();
    console.log("=== Tests terminés ===");
  } catch (error) {
    console.error("Erreur dans testAPI:", error.message);
  }
}

testAPI();
