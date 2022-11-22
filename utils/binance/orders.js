const orders = async function (binance) {
  let open_orders = await binance.futuresOpenOrders();
  let markets = Object.keys(open_orders);
  let pairs = [];

  for (let market of markets) {
    current_pair = {};
    let obj = open_orders[market];
    let size = Number(obj.positionAmt);
    if (size == 0) continue;

    // remove clientOrderId from the object
    delete obj.clientOrderId;
    delete obj.timeInForce;
    delete obj.time;

    console.log(obj);

    // current_pair["SYMBOL"] = obj.symbol;
    // current_pair["POSITION_AMOUNT"] = obj.positionAmt;
    // current_pair["ENTRY_PRICE"] = obj.entryPrice;
    // current_pair["MARK_PRICE"] = obj.markPrice;
    // current_pair["UNREALIZED_PNL"] = obj.unRealizedProfit;
    // current_pair["LIQUIDATION_PRICE"] = obj.liquidationPrice;
    // current_pair["LEVERAGE"] = obj.leverage;
    // current_pair["MARGIN_TYPE"] = obj.marginType;
    // current_pair["NOTIONAL"] = obj.notional;
    // // convert utc to local time
    obj["updateTime"] = new Date(obj.updateTime).toLocaleString();

    pairs.push(obj);
  }

  return pairs;
};

module.exports = orders;
