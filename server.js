import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Public folder
app.use(express.static(path.join(__dirname, "public")));

// READ ads
app.get("/api/ads", (req, res) => {
    const ads = JSON.parse(fs.readFileSync("./api/ads.json"));
    res.json(ads);
});

// ADD ad
app.post("/api/ads", (req, res) => {
    const ads = JSON.parse(fs.readFileSync("./api/ads.json"));
    
    const newAd = {
        id: Date.now(),
        ...req.body
    };

    ads.push(newAd);
    fs.writeFileSync("./api/ads.json", JSON.stringify(ads, null, 2));

    res.json({ status: "ok", ad: newAd });
});

// Start server
app.listen(3000, () => console.log("Server running on port 3000"));


