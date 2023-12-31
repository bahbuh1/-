const axios = require('axios');

const Prefixes = [
  '/ai',
  'kim',
  'nemoo',
  '+ai',
  'nemo',
  'ai',
  'ask',
];

module.exports = {
  config: {
    name: "ask",
    version: 1.0,
    author: "OtinXSandip",
    longDescription: "AI",
    category: "ai",
    guide: {
      en: "{p} questions",
    },
  },
  run: async function () {},
  onChat: async function ({ api, event, args, message }) {
    try {
      const a = "repl";
      const prefix = Prefixes.find((p) => event.body && event.body.toLowerCase().startsWith(p));
      if (!prefix) {
        return; // Invalid prefix, ignore the command
      }
      const prompt = event.body.substring(prefix.length).trim();
   if (!prompt) {
        await message.reply("Please provide questions🦥");
        return;
      }

api.setMessageReaction("👅", event.messageID, () => {}, true);
      const response = await axios.get(`https://sdxl.otinxsandeep.${a}.co/gpt?prompt=${encodeURIComponent(prompt)}`);
      const answer = response.data.answer;

 api.setMessageReaction("✅", event.messageID, () => {}, true);
    await message.reply(answer);

    } catch (error) {
      console.error("Error:", error.message);
    }
  }
};