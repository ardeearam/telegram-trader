const TelegramBot = require('node-telegram-bot-api');
const Bitmex = require('./exchanges/bitmex');

module.exports = (() => {
  class Trader {

    constructor({network}) {
      const allowedNetworks = ['testnet', 'mainnet'];

      if (!allowedNetworks.includes(network)) {
        throw new Error(`Invalid network: ${network}`);
      }

      this.network = network;

      // This will store the Bitmex instances of individual users communicating with the bot
      this.clients = {};
      

      this._quote = {};
      this.clients.pub = (new Bitmex({network: network, apiKeyId: '', apiKeySecret: ''})).getClient();

    }

    start() {
      console.log(`Starting Telegram Trader on ${this.getNetwork()}...`);
      const token = process.env.TELEGRAM_BOT_TOKEN;
      if(!token) throw new Error('TELEGRAM_BOT_TOKEN is not defined');
      this.bot = new TelegramBot(token, {polling: true});

      this.bot.onText(/\/bid (.+)/, this.bid());
      this.bot.onText(/\/ask (.+)/, this.bid());
      this.bot.onText(/\/help/, this.help());
      this.bot.onText(/\/start/, this.help());
      this.bot.onText(/\/ping/, this.ping());
      this.bot.onText(/\/quote (.+)/, this.quote());
      this.bot.onText(/\/register (.+) (.+)/, this.register());
    }

    bid() {
      return (msg, match) => {
        const chatId = msg.chat.id;
        const chatType = msg.chat.type;
        const from = msg.from.username;

        if (chatType == "group") {
          this.bot.sendMessage(chatId, `To issue a bid, please send me a private message @${from}`);
          return;
        }

        if(!this.clients[from]) {
          this.bot.sendMessage(chatId, 'First, register by adding your Bitmex API Key and Secret via /register <key> <secret>');
        } else {
          this.bot.sendMessage(chatId, 'Okay.');
        }
      }
    }

    register() {
      return (msg, match) => {
        const chatId = msg.chat.id;
        const chatType = msg.chat.type;
        const from = msg.from.username;

        if (chatType == "group") {
          this.bot.sendMessage(chatId, `To register, please send me a private message @${from}. 
Please do NOT send your API Keys to this group. Kindly delete your API Keys if sent by accident.`);
          return;
        }

        if(!this.clients[from]) {
          const apiKeyId = match[1];
          const apiKeySecret = match[2];
          this.clients[from] = (new Bitmex({network: this.network})).getClient();
          this.bot.sendMessage(chatId, `Registration successful! Try issuing private commands now. ${apiKeyId} ${apiKeySecret}`);
        } else {
          this.bot.sendMessage(chatId, 'You are already registered. No action has been taken.');
        }
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
/register
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
        const resp = `I'm alive, alert, awake, enthusiastic!`; // the captured "whatever"
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
          this.clients.pub.addStream(symbol, 'quote', data => {this._quote[symbol] = data[data.length - 1]});
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
