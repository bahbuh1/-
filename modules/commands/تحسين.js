const axios = require('axios');
const fs = require('fs-extra');

module.exports.config = {
  name: "تحسين",
  version: "1.0.",
  hasPermssion: 0,
  credits: "DRIDI-RAYEN",
  description: "رفع جودة الصور",
  commandCategory: "ذكاء اصطناعي",
  usages: "رد علىى صورة لرفع الجودة",
  cooldowns: 2,
};

module.exports.run = async ({ api, event, args }) => {
  let pathie = __dirname + `/cache/zombie.jpg`;
  const { threadID, messageID } = event;

  var james = event.messageReply.attachments[0].url || args.join(" ");

  try {
    api.sendMessage("جاري رفع الجودة⏳...", threadID, messageID);
    const response = await axios.get(`https://remeni.hayih59124.repl.co/remeni?url=${encodeURIComponent(james)}`);
    const processedImageURL = response.data.image_data;

    const img = (await axios.get(processedImageURL, { responseType: "arraybuffer"})).data;

    fs.writeFileSync(pathie, Buffer.from(img, 'utf-8'));

    api.sendMessage({
      body: "تم رفع الجودة بنجاح☑️",
      attachment: fs.createReadStream(pathie)
    }, threadID, () => fs.unlinkSync(pathie), messageID);
  } catch (error) {
    api.sendMessage(`Error processing image: ${error}`, threadID, messageID);
  };
};