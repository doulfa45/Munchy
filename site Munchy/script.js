async function fetchTokenData() {
    try {
        console.log("Fetching token data...");
        
        // Effectuer la requête à l'API Jupiter
        const response = await fetch(`https://quote-api.jup.ag/v1/price?ids=HgD4Dc6qYCj3UanMDiuC4qANheeTsAvk6DY91B3F8gnL`);
        const data = await response.json();

        console.log("API Response:", data);

        // Récupérer le prix du token
        const tokenPrice = data.data["HgD4Dc6qYCj3UanMDiuC4qANheeTsAvk6DY91B3F8gnL"].price;
        console.log("Token Price:", tokenPrice);

        // Calculer la market cap
        const marketCap = calculateMarketCap(tokenPrice);
        console.log("Market Cap (in millions):", marketCap);

        // Mettre à jour les données dans les éléments HTML (si utilisés)
        document.getElementById('token-price').innerText = `$${tokenPrice.toFixed(6)}`;
        document.getElementById('market-cap').innerText = `$${marketCap}M`;
    } catch (error) {
        console.error('Error fetching token data:', error);
    }
}

// Calculer la market cap en fonction de l'offre totale
function calculateMarketCap(price) {
    const totalSupply = 1000000000; // Exemple : 1 milliard
    const marketCap = (price * totalSupply) / 1e6; // Conversion en millions
    return marketCap.toFixed(2); // Limiter à 2 décimales
}

// Appel initial pour récupérer les données
fetchTokenData();

// Actualiser les données toutes les 60 secondes
setInterval(fetchTokenData, 60000);
