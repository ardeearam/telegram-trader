const TelegramBot = require('node-telegram-bot-api');

module.exports = (() => {
  class Test {

    start() {
      console.log("Starting TelegramBot...");
      const token = process.env.TELEGRAM_BOT_TOKEN;
      const bot = new TelegramBot(token, {polling: true});

      bot.onText(/\/bid (.+)/, (msg, match) => {
        // 'msg' is the received Message from Telegram
        // 'match' is the result of executing the regexp above on the text content
        // of the message
       
        const chatId = msg.chat.id;
        const resp = `Simon says ${match[1]}`; // the captured "whatever"
       
        // send back the matched "whatever" to the chat
        bot.sendMessage(chatId, resp);
      });
    }


  }

  return Test;

})();
