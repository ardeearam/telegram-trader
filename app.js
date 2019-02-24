const Trader = require('./lib/trader');
const network = process.env.TRADER_NETWORK || "testnet";
const trader = new Trader({network: network});
trader.start();

module.exports = (() => Trader)();
