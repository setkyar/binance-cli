const position = async function (binance) {
  let position_data = await binance.futuresPositionRisk();
  let markets = Object.keys(position_data);
  let pairs = [];

  for (let market of markets) {
    current_pair = {};
    let obj = position_data[market];
    let size = Number(obj.positionAmt);
    if (size == 0) continue;

    current_pair["SYMBOL"] = obj.symbol;
    current_pair["POSITION_AMOUNT"] = obj.positionAmt;
    current_pair["ENTRY_PRICE"] = obj.entryPrice;
    current_pair["MARK_PRICE"] = obj.markPrice;
    current_pair["UNREALIZED_PNL"] = obj.unRealizedProfit;
    current_pair["LIQUIDATION_PRICE"] = obj.liquidationPrice;
    current_pair["LEVERAGE"] = obj.leverage;
    current_pair["MARGIN_TYPE"] = obj.marginType;
    current_pair["NOTIONAL"] = obj.notional;
    // convert utc to local time
    current_pair["ENTRY_AT"] = new Date(obj.updateTime).toLocaleString();

    pairs.push(current_pair);
  }

  return pairs;
};

module.exports = position;
