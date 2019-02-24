const BitMEXClient = require('bitmex-realtime-api');

module.exports = (() => {

  class Bitmex {

    constructor({network, apiKeyId, apiKeySecret}) {

      let isTestnet;

      switch(network) {
        case 'testnet':
          isTestnet = true;
          break;
        case 'mainnet':
          isTestnet = false;
          break;
        default:
          throw new Error(`Invalid network: ${network}`);
      }

      this.client = new BitMEXClient({testnet: isTestnet});
    }

    getClient() {
      return this.client;
    }

  }

  return Bitmex;
})();
