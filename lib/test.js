const TelegramBot = require('node-telegram-bot-api');

module.exports = (() => {
  class Test {

    start() {
      console.log("Starting TelegramBot...");
      const token = process.env.TELEGRAM_BOT_TOKEN;
      this.bot = new TelegramBot(token, {polling: true});

      this.bot.onText(/\/bid (.+)/, this.bid());
      this.bot.onText(/\/ask (.+)/, this.bid());
      this.bot.onText(/\/help/, this.help());
      this.bot.onText(/\/start/, this.help());
      this.bot.onText(/\/ping/, this.ping());
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
/ping
/start
/help
`; 
       
        // send back the matched "whatever" to the chat
        console.log(this.bot);
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
  }

  return Test;

})();
