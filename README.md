# telegram-trader
A trader bot with Telegram interface

# Installation
```console
export TELEGRAM_BOT_TOKEN=xxxxxx
export TRADER_NETWORK=(mainnet|testnet)  
npm install
npm start
```

# Telegram Commands
```console
/start

/help

/ping
# Connection to Bitmex is UP.

/quote <symbol>
# {"timestamp":"2019-02-24T17:34:12.764Z","symbol":"XBTM19","bidSize":356,"bidPrice":3763,"askPrice":3764,"askSize":55020}
```

# License

MIT License

Copyright (c) 2019 Ardee Aram

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
