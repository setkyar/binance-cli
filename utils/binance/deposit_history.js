const deposit_history = async (binance) => {
  const deposit_history = await binance.depositHistory();
  console.log(deposit_history);
  return deposit_history;
}

module.exports = deposit_history;