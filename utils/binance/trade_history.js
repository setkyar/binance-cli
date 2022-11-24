const trade_history = async (binance, symbol, limit = 1000) => {
  const trade_history = await binance.futuresTrades(symbol, { limit });
  return trade_history;
}