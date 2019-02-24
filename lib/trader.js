const TelegramBot = require('node-telegram-bot-api');
const Bitmex = require('./exchanges/bitmex');

module.exports = (() => {
  class Trader {

    constructor({network, apiKeyId, apiKeySecret}) {
      const allowedNetworks = ['testnet', 'mainnet'];

      if (!allowedNetworks.includes(network)) {
        throw new Error(`Invalid network: ${network}`);
      }

      this.network = network;

      let exchange = new Bitmex({network: network, 
        apiKeyId: apiKeyId, apiKeySecret: apiKeySecret});

      this._quote = {};
      this.client = exchange.getClient();

    }

    start() {
      console.log(`Starting Telegram Trader on ${this.getNetwork()}...`);
      const token = process.env.TELEGRAM_BOT_TOKEN;
      this.bot = new TelegramBot(token, {polling: true});

      this.bot.onText(/\/bid (.+)/, this.bid());
      this.bot.onText(/\/ask (.+)/, this.bid());
      this.bot.onText(/\/help/, this.help());
      this.bot.onText(/\/start/, this.help());
      this.bot.onText(/\/ping/, this.ping());
      this.bot.onText(/\/quote (.+)/, this.quote());
    }

    bid() {
      return (msg, match) => {
        const chatId = msg.chat.id;
        const resp = `Simon says ${match[1]}`; // the captured "whatever"
        this.bot.sendMessage(chatId, resp);
      }
    }

    help() {

      return (msg, match) => {
        // 'msg' is the received Message from Telegram
        // 'match' is the result of executing the regexp above on the text content
        // of the message
       
        const chatId = msg.chat.id;
        const resp = `
Hello! I am still under construction, but these commands will be available soon:
/bid
/ask
/quote
/ping
/start
/help
`; 
       
        this.bot.sendMessage(chatId, resp);
      }
    }

    ping() {
      return (msg, match) => {
        const chatId = msg.chat.id;
        const resp = `Connection to Bitmex is UP.`; // the captured "whatever"
        this.bot.sendMessage(chatId, resp);
      }
    }

    quote() {
      return (msg, match) => {
        const chatId = msg.chat.id;
        const symbol = match[1];
        let resp;
        if(!this._quote[symbol]) {
          // Subscribe first if this is a new symbol
          this.client.addStream(symbol, 'quote', data => {this._quote[symbol] = data[data.length - 1]});
          setTimeout(() => {
            resp = `${JSON.stringify(this._quote[symbol])}`  
            this.bot.sendMessage(chatId, resp);
          }, 500);
        } else {
          // Just check last data via websocket
          resp = `${JSON.stringify(this._quote[symbol])}`  
          this.bot.sendMessage(chatId, resp);
        }
      }
    }

    getNetwork() {
      return this.network;
    }
  }

  return Trader;

})();
