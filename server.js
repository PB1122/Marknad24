const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Hämta annonser
app.get('/api/ads', (req, res) => {
    const ads = JSON.parse(fs.readFileSync('ads.json'));
    res.json(ads);
});

// Lägg till annons
app.post('/api/ads', (req, res) => {
    const ads = JSON.parse(fs.readFileSync('ads.json'));
    const newAd = req.body;
    newAd.id = 'ad_' + Date.now();
    newAd.date = new Date().toLocaleString();
    ads.push(newAd);
    fs.writeFileSync('ads.json', JSON.stringify(ads, null, 2));
    res.json({ success: true, ad: newAd });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



