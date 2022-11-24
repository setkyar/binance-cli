#!/usr/bin/env node
const program = require("commander");
const binanceApi = require("node-binance-api");

const log = console.log;
const table = console.table;

const env = require("path").join(require("os").homedir(), ".crypto_cli_env");

const b_init = require("./utils/binance/init");

if (b_init(env)) {
  const future_market = require("./utils/binance/future_market");
  const binance_position = require("./utils/binance/position");
  const binance_balance = require("./utils/binance/balance");
  const binance_orders = require("./utils/binance/orders");
  const binance_deposit_history = require("./utils/binance/deposit_history");

  const binance = new binanceApi().options({
    APIKEY: process.env.CRYPTO_CLI_BINANCE_API_KEY,
    APISECRET: process.env.CRYPTO_CLI_BINANCE_API_SECRET,
  });

  program.version("0.0.1").description("Crypto CLI");

  program
    .command("future_market")
    .alias("fm")
    .description("Get future market data")
    .action(async () => {
      const market = await future_market(binance);

      console.log(market);
      table(market);
    });


  program
    .command("position")
    .alias("p")
    .description("Binance Position")
    .action(() => {
      const position = binance_position(binance);

      position.then((data) => {

        if (data.length <= 0) {
          log("No opending position found!");
          return
        }

        table(data, [
          "SYMBOL",
          "POSITION_AMOUNT",
          "ENTRY_PRICE",
          "MARK_PRICE",
          "UNREALIZED_PNL",
          "LIQUIDATION_PRICE",
          "LEVERAGE",
          "MARGIN_TYPE",
          "NOTIONAL",
          "ENTRY_AT",
        ]);
      });
    });

  program
    .command("deposit_history")
    .description("Binance Deposit History")
    .alias("dh")
    .action(() => {
      const deposit_history = binance_deposit_history(binance);

      table(deposit_history);
    });

  program
    .command("orders")
    .alias("o")
    .description("Binance Orders")
    .action(() => {
      const orders = binance_orders(binance);

      orders.then((data) => {
        table(data);
      });
    });

  program
    .command("balance")
    .alias("b")
    .description("Binance Balance")
    .action(() => {
      const balance = binance_balance(binance);
      balance.then((data) => {
        table(data);
      });
    });

  program
    .command("stream <symbol>")
    .description("Stream")
    .action((symbol) => {
      binance.futuresMiniTickerStream(s);
    });

  program.parse(process.argv);
}
