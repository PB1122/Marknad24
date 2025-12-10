async function loadAds() {
    const res = await fetch('/api/ads');
    const ads = await res.json();
    console.log(ads);
}

async function addAd(ad) {
    const res = await fetch('/api/ads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ad)
    });
    const data = await res.json();
    console.log(data);
}

// Exempel på att lägga till en annons
// addAd({ title:"Soffa", description:"Fin", price:100, category:"möbler", condition:"Bra skick", sellerEmail:"test@test.com" });

loadAds();

