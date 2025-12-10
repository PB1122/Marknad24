const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Path till ads.json
const adsFile = path.join(__dirname, 'api', 'ads.json');

// GET - hämta alla annonser
app.get('/api/ads', (req, res) => {
    fs.readFile(adsFile, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Kunde inte läsa filen.' });
        const ads = JSON.parse(data || '[]');
        res.json(ads);
    });
});

// POST - lägg till ny annons
app.post('/api/ads', (req, res) => {
    const newAd = req.body;

    fs.readFile(adsFile, 'utf8', (err, data) => {
        let ads = [];
        if (!err) ads = JSON.parse(data || '[]');
        ads.push(newAd);

        fs.writeFile(adsFile, JSON.stringify(ads, null, 2), (err) => {
            if (err) return res.status(500).json({ error: 'Kunde inte spara annonsen.' });
            res.json({ success: true, ad: newAd });
        });
    });
});

// Starta server
app.listen(PORT, () => console.log(`Server körs på port ${PORT}`));
