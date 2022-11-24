const balance = async function (binance) {
    const balances = await binance.futuresBalance();
    const balance = balances.filter((b) => b.balance > 0);
    return balance;
};

module.exports = balance;
