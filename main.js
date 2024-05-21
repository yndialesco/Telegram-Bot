
require("dotenv").config();
const Bot = require("./app/Bot");

const token = process.env.TELEGRAM_TOKEN;
const options = {
  polling: true
}
const synscbot = new Bot(token, options)



const main = () => {
  synscbot.getGreeting()
  synscbot.getSticker()
  synscbot.getQuotes()
  synscbot.getNews()
  synscbot.getFollow()
  synscbot.getEarthquake()
}

main()

