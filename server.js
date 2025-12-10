const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Låt Express servera alla filer i public-mappen
app.use(express.static(path.join(__dirname, 'public')));

// API för annonser
app.use(express.json());
const adsFile = path.join(__dirname, 'ads.json');

app.get('/ads', (req, res) => {
  if (!fs.existsSync(adsFile)) {
    fs.writeFileSync(adsFile, JSON.stringify([]));
  }
  const ads = JSON.parse(fs.readFileSync(adsFile));
  res.json(ads);
});

app.post('/ads', (req, res) => {
  const ads = fs.existsSync(adsFile) ? JSON.parse(fs.readFileSync(adsFile)) : [];
  const newAd = { ...req.body, id: 'ad_' + Date.now(), date: new Date().toLocaleString() };
  ads.push(newAd);
  fs.writeFileSync(adsFile, JSON.stringify(ads, null, 2));
  res.status(201).json(newAd);
});

// Om ingen annan route matchar, skicka index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Starta server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

