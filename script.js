// Le code ci-dessous permet de créer une api sur les langages de programmation. La route POST /language est déjà implémentée. Elle ajoute le langage passé dans le body dans la database. En suivant le même principe, implémente les 3 autres routes sur CRUD (Read, Update et Delete).

const express = require("express");
const app = express();
const port = 3000;

const database = ["html", "css"];

app.use(express.json());

// Ajoute un langage dans "database"
app.post("/languages", (req, res) => {
  database.push(req.body.language);
  res.status(201).json({ language: req.body.language });
});

// GET /languages (renvoie la liste des langages de la database en json)
app.get("/languages", (req, res) => {
  res.status(200).json({ languages: database });
});

// TODO: PUT /languages/:name (remplace le langage passé dans l'url par celui passé dans le body, par exemple /languages/html avec {"language": "c++"}, remplace html par c++ dans la database)

app.put("/languages/:name", (req, res) => {
  const index = database.indexOf(req.params.name);

  if (index !== -1) {
    database[index] = req.body.language;
    res.status(200).json({
      language: req.body.language,
    });
  } else {
    res.status(404).json({
      error: "Language not found",
    });
  }
});

// TODO: DELETE /languages (supprime le langage passé dans le body, par exemple {"language": "c++"})
app.delete("/languages", (req, res) => {
  // Trouve l'index du langage
  const index = database.indexOf(req.body.language);
  if (index !== -1) {
    // Supprime le langage
    database.splice(index, 1);
    // Réponse de succès
    res.status(200).json({ message: "Langage supprimé avec succès" });
  } else {
    // Réponse d'erreur
    res.status(404).json({ error: "Langage non trouvé" });
  }
});

// 💡 N'hésite pas à aller sur MDN pour choisir les bonnes méthodes de array pour modifier database

app.listen(port, () => {
  console.log(`Server started on <http://localhost:${port}`);
});
