const express = require("express");
const app = express();
const port = 3000;

// Importera JSON-data
const laroplanData = require("/laroplan.json");

// Endpoint för läroplan
app.get("/api/laroplan", (req, res) => {
  res.json(laroplanData);
});

// Starta servern
app.listen(port, () => {
  console.log(`Server körs på http://localhost:${port}`);
});
