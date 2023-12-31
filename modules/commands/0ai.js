const axios = require("axios");

module.exports.config = {
  name: "ai",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "cyril", // Api by reiko
  description: "Gpt 4 by reiko",
  usePrefix: true,
  commandCategory: "ذكاء اصطناعي",
  usages: ["ai <question>"],
  cooldowns: 2,
};

module.exports.run = async function ({ api, event, args }) {
  let { messageID, threadID } = event;
  let tid = threadID,
    mid = messageID;
  const content = encodeURIComponent(args.join(" "));
  if (!args[0]) return api.sendMessage("Please, provide a query.", tid, mid);
  try {
    api.sendTypingIndicator(event.threadID, true);

    const res = await axios.get(`https://reikodev.spiritii.repl.co/api/gpt4?query=${content}`);
    const response = res.data.reply;

    if (response) {
      const messageText = `${response}\n\nAli Hussein`;
      api.setMessageReaction("✅️", event.messageID, (err) => {}, true);
      api.sendMessage(messageText, tid, mid);
    } else if (res.data.error) {
      api.sendMessage(`Error: ${res.data.error}`, tid, mid);
    } else {
      api.sendMessage("An unexpected error occurred.", tid, mid);
    }
  } catch (error) {
    console.error(error);
    api.sendMessage("An error occurred while fetching the data.", tid, mid);
  }
};