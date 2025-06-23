const express = require("express");
const app = express();
const port = 3000;

const database = ["html", "css"];

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Bienvenue sur l'API des langages de programmation !");
});

app.post("/languages", (req, res) => {
  const language = req.body.language;
  if (!language || typeof language !== "string" || language.trim() === "") {
    return res.status(400).json({ error: "Langage invalide ou manquant" });
  }
  database.push(language);
  console.log("Database après POST:", database);
  res.status(201).json({ language });
});

app.get("/languages", (req, res) => {
  console.log("Database:", database);
  res.status(200).json({ languages: database });
});

app.put("/languages/:name", (req, res) => {
  const index = database.indexOf(req.params.name);
  const language = req.body.language;
  if (index !== -1) {
    if (!language || typeof language !== "string" || language.trim() === "") {
      return res.status(400).json({ error: "Langage invalide ou manquant" });
    }
    database[index] = language;
    console.log("Database après PUT:", database);
    res.status(200).json({ language });
  } else {
    res.status(404).json({ error: "Langage non trouvé" });
  }
});

app.delete("/languages", (req, res) => {
  const language = req.body.language;
  if (!language || typeof language !== "string" || language.trim() === "") {
    return res.status(400).json({ error: "Langage invalide ou manquant" });
  }
  const index = database.indexOf(language);
  if (index !== -1) {
    database.splice(index, 1);
    console.log("Database après DELETE:", database);
    res.status(200).json({ message: "Langage supprimé avec succès" });
  } else {
    res.status(404).json({ error: "Langage non trouvé" });
  }
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
