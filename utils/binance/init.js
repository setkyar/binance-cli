const prompt = require("prompt-sync")();

const init = (env) => {
  if (!require("fs").existsSync(env)) {
    const api_key = prompt("Enter your Binance API key: ");
    const api_secret = prompt("Enter your Binance API secret: ");
    require("fs").writeFileSync(
      env,
      `CRYPTO_CLI_BINANCE_API_KEY=${api_key}\nCRYPTO_CLI_BINANCE_API_SECRET=${api_secret}\n`
    );
  }

  require("dotenv").config({ path: env });

  if (!process.env.CRYPTO_CLI_BINANCE_API_KEY) {
    console.log(`API key not found. Please set it in the ${env} file.`);
    process.exit(1);
  }

  if (!process.env.CRYPTO_CLI_BINANCE_API_SECRET) {
    console.log(`API secret not found. Please set it in the ${env} file.`);
    process.exit(1);
  }

  return true;
};

module.exports = init;
