const TelegramBot = require("node-telegram-bot-api");

const commands = require("../libs/command");

const { helpMsg, invalidCommandMsg } = require("../libs/constant");

var today = new Date();
var date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
var time =
  today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date + " " + time;

class Bot extends TelegramBot {
  constructor(token, options) {
    super(token, options);
    this.on("message", (data) => {
      const isInCommand = Object.values(commands).some((keyword) =>
        keyword.test(data.text)
      );

      if (!isInCommand) {
        this.sendMessage(data.from.id, invalidCommandMsg, {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "User Guide",
                  callback_data: "go to help",
                },
              ],
            ],
          },
        });
      }
    });

    this.on("callback_query", (callback) => {
      const callBackData = callback.data;
      if (callBackData == "go to help") {
        this.sendMessage(callback.from.id, helpMsg);
      }
    });
  }

  getGreeting() {
    this.onText(commands.greeting, (data) => {
      console.log("getGreeting is executed by", data.from.username, dateTime);
      this.sendMessage(data.from.id, `Hello, ${data.from.username}👋`);
    });
  }

  getSticker() {
    this.on("sticker", (data) => {
      console.log("getSticker is executed by", data.from.username, dateTime);
      this.sendMessage(data.from.id, data.sticker.emoji);
    });
  }

  getQuotes() {
    this.onText(commands.quote, async (data) => {
      const quoteEndpoint = "https://api.kanye.rest/";
      try {
        const apiCall = await fetch(quoteEndpoint);
        const response = await apiCall.json();
        console.log("getQuotes is executed by", data.from.username, dateTime);
        this.sendMessage(data.from.id, `${response.quote}`);
      } catch (error) {
        this.sendMessage(
          data.from.id,
          "Maaf ada kesalahan, silakan coba lagi nanti."
        );
      }
    });
  }

  // getNews() {
  //   this.onText(commands.news, async (data) => {
  //     this.sendMessage(data.from.id, "Showing latest news...");
  //     const newsEndpoint = "https://jakpost.vercel.app/api/category/indonesia";
  //     try {
  //       const apiCall = await fetch(newsEndpoint);
  //       const response = await apiCall.json();
  //
  //       shownNews = 4;
  //       for (let i = 0; i < shownNews; i++) {
  //         const news = response.posts[i];
  //         const { title, image, headline, link } = news;
  //         this.sendPhoto(data.from.id, image, {
  //           caption: `Title: ${title}\n\n Headline: ${headline} ${link}`,
  //         });
  //       }
  //     } catch (error) {
  //       this.sendMessage(
  //         data.from.id,
  //         "Maaf ada kesalahan, silakan coba lagi nanti."
  //       );
  //     }
  //   });
  // }

  getNews() {
    this.onText(commands.news, async(data) => {
      const newsEndpoint = 'https://jakpost.vercel.app/api/category/indonesia'
      const apiCall = await fetch(newsEndpoint)
      const response = await apiCall.json()
      console.log(response)
      const news = response.posts
      //const {title, headline, image} = news
      const title = news
      console.log(news)
      this.sendMessage(data.from.id, `${title}`)
      
  })
}

  getFollow() {
    this.onText(commands.follow, (data, after) => {
      console.log("getFollow is executed by", data.from.username, dateTime);
      this.sendMessage(data.from.id, after[1]);
    });
  }

  getEarthquake() {
    this.onText(commands.quake, async (data) => {
      const quakeEndpoint =
        "https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json";
      console.log("getEarthquake is executed by", data.from.username, dateTime);
      try {
        const apiCall = await fetch(quakeEndpoint);
        const response = await apiCall.json();
        const { gempa } = response.Infogempa;
        const { Wilayah, Magnitude, Tanggal, Jam, Kedalaman, Shakemap } = gempa;

        const imgSourceUrl = "https://data.bmkg.go.id/DataMKG/TEWS/" + Shakemap;

        this.sendPhoto(data.from.id, imgSourceUrl, {
          caption: ` Latest Earthquake Information on ${Tanggal} at ${Jam}:
Zone: ${Wilayah}
Magnitude: ${Magnitude}
Depth: ${Kedalaman} SR
            `,
        });
      } catch (error) {
        console.log(error);
      }
    });
  }

  getHelp() {
    this.onText(commands.help, async (data) => {
      const botProfile = await this.getMe();
      this.sendMessage(data.from.id, helpMsg);
    });
  }
}
module.exports = Bot;
