#!/usr/bin/env node

require("dotenv").config();

const program = require("commander");
const binanceApi = require("node-binance-api");
const chalk = require("chalk");
const log = console.log;
const table = console.table;

const binance = new binanceApi().options({
  APIKEY: process.env.BINANCE_APIKEY,
  APISECRET: process.env.BINANCE_APISECRET,
});

const currentOpenPositions = require("./utils/binance/currentOpenPositions");

(async () => {
  let binanceOpenPositions = await currentOpenPositions(binance);

  table(binanceOpenPositions);

  // let ticker = await binance.prices();

  // table(ticker.BNBUSDT);

  // console.info(`Price of BNB: ${ticker.BNBUSDT}`);

  // console.info(await binance.futuresExchangeInfo());

  // console.info(await binance.futuresQuote("BTCUSDT"));
})();