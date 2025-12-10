const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

// GET annonser
app.get('/api/ads', (req, res) => {
    const filePath = path.join(__dirname, 'api', 'ads.json');
    if (!fs.existsSync(filePath)) return res.json([]);
    const ads = JSON.parse(fs.readFileSync(filePath));
    res.json(ads);
});

// POST ny annons
app.post('/api/ads', (req, res) => {
    const newAd = req.body;
    const filePath = path.join(__dirname, 'api', 'ads.json');
    let ads = [];
    if (fs.existsSync(filePath)) {
        ads = JSON.parse(fs.readFileSync(filePath));
    }
    ads.push(newAd);
    fs.writeFileSync(filePath, JSON.stringify(ads, null, 2));
    res.json({ success: true });
});

app.listen(port, () => console.log(`Server kör på port ${port}`));

