const currentOpenPositions = async function (binance) {
  let position_data = await binance.futuresPositionRisk()
  let markets = Object.keys(position_data);
  let pairs = []

  for (let market of markets) {
    current_pair = {}
    let obj = position_data[market];
    let size = Number(obj.positionAmt);
    if (size == 0) continue;

    current_pair['market'] = position_data[market]["symbol"];
    current_pair['size'] = size;
    current_pair['pnl'] = obj.unRealizedProfit;

    pairs.push(current_pair);
  }

  return pairs
};

module.exports = currentOpenPositions;
