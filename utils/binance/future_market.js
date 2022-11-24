const future_market = async function (binance) {
  const future_market_data = await binance.futuresPrices();

  let markets = {};
  for (let market in future_market_data) {
    if (market.endsWith("USDT")) {
        markets[market] = future_market_data[market];
    }
  }

  return markets;
};

module.exports = future_market;