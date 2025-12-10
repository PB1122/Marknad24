// api/ad.js
const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
    const filePath = path.join(process.cwd(), 'api', 'annonser.json');

    // Om filen inte finns, skapa en tom array
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([]));
    }

    let ads = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    if (req.method === 'GET') {
        // Returnera alla annonser
        res.status(200).json(ads);
    } else if (req.method === 'POST') {
        const { title, description, price, category, condition, image, sellerEmail } = req.body;
        if (!title || !description || !price || !category || !condition || !sellerEmail) {
            return res.status(400).json({ message: 'Felaktig data' });
        }

        const newAd = {
            id: 'ad_' + Date.now(),
            title,
            description,
            price,
            category,
            condition,
            image: image || null,
            sellerEmail,
            date: new Date().toLocaleString()
        };

        ads.push(newAd);
        fs.writeFileSync(filePath, JSON.stringify(ads, null, 2));

        res.status(201).json(newAd);
    } else {
        res.status(405).json({ message: 'Metod ej tillåten' });
    }
}
