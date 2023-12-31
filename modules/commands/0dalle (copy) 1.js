const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

module.exports.config = {
    name: "kol",
    version: "1.0",
    credit: "@Cock | Duck",
    hasPermssion: 0,
    usePrefix: true,
    description: "Generate images by Dalle-3 AI",
    commandCategory: "ذكاء اصطناعي",
    usages: "[text] \nJamon [A 17/18/19 years old boy/girl watching football match on tv and written Dipto and 69 on the back of his Dress , 4k]",
    cooldowns: 5
  };

module.exports.run = async function ({ api, event, args }) {
  const prompt = args.join(" ");
  if (!prompt) {
   return api.sendMessage("❌| Wrong Formet .✅ | Use 17/18 years old boy/girl watching football match on tv and written Dipto and 69 on the back of his Dress , 4k",event.threadID,event.messageID);
  }
    try {
      const w = await api.sendMessage("Please wait...", event.threadID);
      const fuck = ['1g6VqvFI3c2hknTG8SSbJfKLgZukII7A5vMq5xewuladCcQP1_wRc7aVPcC-1_hFK1oJvzWRociOXVSNI98MFSoWUo6vohdU2VgnGktgb1tUB-0fO6n-k5VYMRQMFDyGf3WKuXaBTPweoxH5zucfBAr6V_Mtnjf5-pHDA2iWfHEMQpTW7MluvpFUiLhqd1BU8Q2PUybjZhib3Mhov91ic4JL-QWHUcHeO_v88JowAJDQ','1pCtWBTSzVvRlNbjRjeZLNZSx2srRm9fkdVsBTtUx7X9V0wZ-vKJDgPUivj2GRCovsDgZzAKOYa1qccTE1K3kYc82vhPwdja5QgsLs56lj2z6-WAj-wiomQXkSMT2xEAiPnnLfqrI1_9cEDapgyA3zRCj046gqbzJzCfgOHGGdXYHtFMo9cuf-oABZyjE11h0F0UAWMn0tmMTlGJ6rpppKw','1uzonyQf-NqWhThzeFPz1Df60IVkHhGSQ3hKBplHfcnumyU8yq2qxO4iPmPzrr2hKNP3FG4WEDweNNL3RYkibLd1IjQcDaqpjUNC-T8-qEqd-xgpMteuCcjpT95ZefXBsuN12Y6JGO0v--zVet0MVtvdC4QMwxW2u7T8Zos0FGa0NuvkdnvA-MUs_hHqFyGG1qP0dgmAwZQo2wGW23lAjUFp-StzWW1SrSgHhTRB0X_4','1uLSu8AQjd9dHFxo1FixQ2DdHTKiUReeVVGgA3t0ZPvP2XEqCcrwIfusZY3zYexWOLcehEnrPWbQqnLRKV5V0qldzDX5YK_ZP_HtcU5m4mJXn06bXR0PqdBvRukUNp3_C86Phua0m-srgVt4zjNDfWorT5EPJlgAiOqIY0T34xLVm2jC2mq9n3GmR6oCFBEglTBX9pWYbWowBaJxmHgHvzw','1_lRPIJCGYOkHQwCA7Q6QJ0WA4yYogi7QKXJ02jdiVys1hOVPUtqpJhBbedkr2r7DxMWdMiTWB3t3k8JDkE7AqPU9pHf6QolNEQfK1tVHbT0Ev_W01jDsqLK8UVBz6E2P6gSn5K9_XlrG5eHCFFrvyxaexerbVKKH7vRS9RVBV1sHfD2TuQ-xYpgL92zw-DeGQWWU6tq7O-iqP9i4pWoLtQ'];
      var dipto = fuck[Math.floor(Math.random() * fuck.length)];
   const url = `https://bingimagecreator.emma999999.repl.co/api/dalle?prompt=${prompt}&cookie=${dipto}`;
      const response = await axios.get(url);
      const data = response.data.image_urls;

      if (!data || data.length === 0) {
        api.sendMessage("Empty response or no images generated.",event.threadID,event.messageID);
      }

      const imgData = [];

      for (let i = 0; i < data.length; i++) {
        const imgUrl = data[i];
        const imgResponse = await axios.get(imgUrl, { responseType: 'arraybuffer' });
        const imgPath = path.join(__dirname, 'dalle', `${i + 1}.jpg`);
        await fs.outputFile(imgPath, imgResponse.data);
        imgData.push(fs.createReadStream(imgPath));
      }
      await api.unsendMessage(w.messageID);

      await api.sendMessage({
        body: `✅ |تفضل تخيلك يلطيف<😘`,
        attachment: imgData
      },event.threadID, event.messageID);
    } catch (error) {
      console.error(error);
      await api.sendMessage(`Generation failed!\nError: ${error.message}`,event.threadID, event.messageID);
    }
  };