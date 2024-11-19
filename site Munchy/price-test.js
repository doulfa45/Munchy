const { PublicKey, Connection } = require("@solana/web3.js");
const { AnchorProvider } = require("@coral-xyz/anchor");
const { WhirlpoolContext, buildWhirlpoolClient, ORCA_WHIRLPOOL_PROGRAM_ID, PriceMath } = require("@orca-so/whirlpools-sdk");
const axios = require('axios');

const connection = new Connection("https://eclipse.helius-rpc.com");
const provider = new AnchorProvider(connection, {}, { commitment: 'confirmed' });

async function getMoonPrices() {
    const ctx = WhirlpoolContext.withProvider(provider, ORCA_WHIRLPOOL_PROGRAM_ID);
    const client = buildWhirlpoolClient(ctx);

    const poolAddress = new PublicKey("HKWEMPBY4zWn8x9ascmKWMGDhcr7WRwNrhAHyvTe1PJT");
    const whirlpool = await client.getPool(poolAddress);
    
    const sqrt_price_x64 = whirlpool.getData().sqrtPrice;
    const moonPriceInETH = PriceMath.sqrtPriceX64ToPrice(sqrt_price_x64, 5, 9) * 0.001;

    const response = await axios.get('https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT');
    const ethUsdPrice = parseFloat(response.data.price);
    
    const moonPriceUSD = moonPriceInETH * ethUsdPrice;

    console.log("MOON Price: $" + moonPriceUSD.toFixed(10));
    return { eth: moonPriceInETH, usd: moonPriceUSD };
}

getMoonPrices();








