// bot.on("message", async (data) => {
//   if (data.text !== '!halo') {
//     const botProfile = await bot.getMe();
//     console.log(botProfile);
//     bot.sendMessage(data.from.id,`Halo, perkenalkan Aku ${botProfile.first_name}. \nBeritahu apa yang bisa aku bantu`);
//   }
// })

bot.on("sticker", (data) => {
    bot.sendMessage(data.from.id, data.sticker.emoji);
  });
  
  bot.onText(/^!halo$/, (data) => {
    // bot.sendMessage(data.from.id, 'Halo Juga!')
    bot.sendMessage(data.from.id, "Halo juga sayangg❤");
  });
  
  bot.onText(/^!follow(.+)/, (data, after) => {
    bot.sendMessage(data.from.id, after[1]);
  });
  
  bot.onText(/!quote/, async (data) => {
    const quoteEndpoint = "https://api.kanye.rest/";
    try {
      const apiCall = await fetch(quoteEndpoint);
      const response = await apiCall.json();
      bot.sendMessage(data.from.id, `${response.quote}`);
    } catch (error) {
      bot.sendMessage(
        data.from.id,
        "Maaf ada kesalahan, silakan coba lagi nanti."
      );
    }
  });
  
  bot.onText(/!news/, async (data) => {
    bot.sendMessage(data.from.id, 'Showing latest news...')
    const newsEndpoint = "https://jakpost.vercel.app/api/category/indonesia";
    try {
      const apiCall = await fetch(newsEndpoint);
      const response = await apiCall.json();
      shownNews = 4
  
      for (let i = 0; i < shownNews; i++) {
        const news = response.posts[i];
        const {title, image, headline, link} = news
        bot.sendPhoto(data.from.id, image, {caption: `Title: ${title}\n\n Headline: ${headline} ${link}`})
      }
    } catch (error) {
      bot.sendMessage(
        data.from.id,
        "Maaf ada kesalahan, silakan coba lagi nanti."
      );
    }
  });
  
  // bot.onText(/!berita/, async (data) => {
  //   const newsEndpoint = "https://jakpost.vercel.app/api/category/indonesia"
  //   const apiCall = await fetch(newsEndpoint)
  //   const response = await apiCall.json()
  //   console.log(response)
  // })

  {
    Infogempa: {
      gempa: {
        Tanggal: '24 Apr 2024',
        Jam: '23:27:52 WIB',
        DateTime: '2024-04-24T16:27:52+00:00',
        Coordinates: '-2.36,120.97',
        Lintang: '2.36 LS',
        Bujur: '120.97 BT',
        Magnitude: '3.1',
        Kedalaman: '7 km',
        Wilayah: 'Pusat gempa berada di darat 33 km barat laut Luwu Timur',
        Potensi: 'Gempa ini dirasakan untuk diteruskan pada masyarakat',
        Dirasakan: 'II-III Mangkutana',
        Shakemap: '20240424232752.mmi.jpg'
      }
    }
  }