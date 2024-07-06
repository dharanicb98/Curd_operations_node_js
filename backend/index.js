const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./db");
app.use(express.json());

app.use(cors());
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server successfully started  http://localhost:${PORT}`);
});

app.get("/products", (req, res) => {
  db.getAllUsers()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.post("/products", (req, res) => {
    const { name, price, brand, category } = req.body;
    if (!name || !price || !brand || !category) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    db.createAllUsers(name, price, brand, category)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  });
  

app.put("/products/:id", (req, res) => {
  const {name, price, brand, category } = req.body;
  const id = req.params.id;
  db.updateAllUsers(id, name, price, brand, category)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.delete("/products/:id", (req, res) => {
    const id = req.params.id;
    db.deleteAllUsers(id)
      .then((result) => {
        res.status(200).send("File deleted successfully");
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  });
  