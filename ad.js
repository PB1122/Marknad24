import { readFile, writeFile } from 'fs/promises';

export default async function handler(req, res) {
  const path = './annonser.json';

  if (req.method === 'GET') {
    const data = await readFile(path, 'utf-8');
    res.status(200).json(JSON.parse(data));
  } else if (req.method === 'POST') {
    const ad = req.body;
    const ads = JSON.parse(await readFile(path, 'utf-8'));
    ads.push(ad);
    await writeFile(path, JSON.stringify(ads, null, 2));
    res.status(201).json(ad);
  } else {
    res.status(405).send('Method Not Allowed');
  }
}
