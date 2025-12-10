import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'api', 'ads.json');

export default function handler(req, res) {
  let ads = [];

  // Läs JSON-fil
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    ads = JSON.parse(data);
  } catch (e) {
    ads = [];
  }

  if (req.method === "GET") {
    res.status(200).json(ads);
  } else if (req.method === "POST") {
    const newAd = req.body;
    newAd.id = "ad_" + Date.now();
    newAd.date = new Date().toLocaleString();
    ads.push(newAd);

    // Skriv tillbaka till fil
    fs.writeFileSync(filePath, JSON.stringify(ads, null, 2));

    res.status(200).json(newAd);
  } else {
    res.status(405).end();
  }
}
