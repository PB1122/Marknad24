
const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

// Hämta alla annonser
app.get("/ads", (req, res) => {
  fs.readFile("ads.json", (err, data) => {
    if (err) return res.status(500).send("Error reading ads");
    res.send(JSON.parse(data));
  });
});

// Lägg till en annons
app.post("/ads", (req, res) => {
  fs.readFile("ads.json", (err, data) => {
    if (err) return res.status(500).send("Error reading ads");
    const ads = JSON.parse(data);
    const newAd = { id: Date.now(), ...req.body, date: new Date().toLocaleString() };
    ads.push(newAd);
    fs.writeFile("ads.json", JSON.stringify(ads, null, 2), err => {
      if (err) return res.status(500).send("Error saving ad");
      res.send(newAd);
    });
  });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Server started on port " + listener.address().port);
});
