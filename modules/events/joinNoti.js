module.exports.config = {
  name: "joinNoti",
  eventType: ["log:subscribe"],
  version: "1.0.1",
  credits: "MrTomXxX",
  description: "Notify bot or group member with random gif/photo/video",
  dependencies: {
    "fs-extra": "",
    "path": ""
  }
};

module.exports.onLoad = function () {
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];

  const path = join(__dirname, "cache", "joinGif");
  if (existsSync(path)) mkdirSync(path, { recursive: true });	

  const path2 = join(__dirname, "cache", "joinGif", "randomgif");
    if (!existsSync(path2)) mkdirSync(path2, { recursive: true });

    return;
}


module.exports.run = async function({ api, event, Users, Threads }) {
    const { join } = global.nodemodule["path"];
  const { threadID } = event;
  if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
    api.changeNickname(`» ${global.config.PREFIX} « → ${(!global.config.BOTNAME) ? "𝙈𝙧𝙏𝙤𝙢 𝙊𝙛𝙛𝙞𝙘𝙞𝙖𝙡 𝘽𝙤𝙩<3" : global.config.BOTNAME}`, threadID, api.getCurrentUserID());
      return api.sendMessage(`●▬▬▬▬▬๑۩۩๑▬▬▬▬▬●\n⫸✅تم تفعيل✅⫷\n●▬▬▬▬▬๑⇩⇩๑▬▬▬▬▬●\n[✖] ❪ البادئة [ . ] ❫\n[✖] لترى الاوامر اكتب [ .الاوامر ]\n[✖] 1-لاتستخدم سمسمي كثيراً\n[✖] 2-لا تقم بطرد البوت\n●▬▬▬▬▬๑⇧⇧๑▬▬▬▬▬●
    \n[✖] للاستفسار تواصل مع المطور \n[✖] حسابة: https://www.facebook.com/sudthida.khwathijak?mibextid=ZbWKwL\n◆━━━━━━━━━━━━━◆\n[✖] 𝙰𝚍𝚖𝚒𝚗: ALI HUSSEIN-علي حسين`, threadID);
  }
  else {
    try {
      const { createReadStream, existsSync, mkdirSync, readdirSync } = global.nodemodule["fs-extra"];
        const moment = require("moment-timezone");
  const time = moment.tz("Asia/baghdad").format("DD/MM/YYYY || HH:mm:s");
  const hours = moment.tz("Asia/baghdad").format("HH");
      let { threadName, participantIDs } = await api.getThreadInfo(threadID);
      const threadData = global.data.threadData.get(parseInt(threadID)) || {};
      const path = join(__dirname, "cache", "joinGif");
      const pathGif = join(path, `join.mp4`);

      var mentions = [], nameArray = [], memLength = [], i = 0;

      for (id in event.logMessageData.addedParticipants) {
          const userName = event.logMessageData.addedParticipants[id].fullName;
          nameArray.push(userName);
          mentions.push({ tag: userName, id });
          memLength.push(participantIDs.length - i++);

          if (!global.data.allUserID.includes(id)) {
              await Users.createData(id, { name: userName, data: {} });
              global.data.userName.set(id, userName);
              global.data.allUserID.push(id);
          }
      }
      memLength.sort((a, b) => a - b);

      (typeof threadData.customJoin == "undefined") ? msg = "رٍحٍم الُِلُِه امرٍأ قٌالُِ خـيرٍاً فُغنم أوُ سڪت فُسلُِم\n\nɴᴀᴍᴇ ➫ {name} \nɢʀᴏᴜᴘ ➫ {threadName}\nᴛɪᴍᴇ  ➫ {time} || {session}": msg = threadData.customJoin;
      msg = msg
                .replace(/\{name}/g, nameArray.join(', '))
                .replace(/\{type}/g, (memLength.length > 1) ? '𝙏𝙝𝙚𝙧𝙚' : '𝙔𝙤𝙪')
                .replace(/\{soThanhVien}/g, memLength.join(', '))
                .replace(/\{threadName}/g, threadName)
                .replace(/\{session}/g, hours <= 10 ? "𝙈𝙤𝙧𝙣𝙞𝙣𝙜" : 
    hours > 10 && hours <= 12 ? "𝘼𝙛𝙩𝙚𝙧𝙉𝙤𝙤𝙣" :
    hours > 12 && hours <= 18 ? "𝙀𝙫𝙚𝙣𝙞𝙣𝙜" : "𝙉𝙞𝙜𝙝𝙩")
                .replace(/\{time}/g, time);  



      if (existsSync(path)) mkdirSync(path, { recursive: true });

      const randomPath = readdirSync(join(__dirname, "cache", "joinGif", "randomgif"));

      if (existsSync(pathGif)) formPush = { body: msg, attachment: createReadStream(pathGif), mentions }
      else if (randomPath.length != 0) {
        const pathRandom = join(__dirname, "cache", "joinGif", "randomgif", `${randomPath[Math.floor(Math.random() * randomPath.length)]}`);
        formPush = { body: msg, attachment: createReadStream(pathRandom), mentions }
      }
      else formPush = { body: msg, mentions }

      return api.sendMessage(formPush, threadID);

    } catch (e) { return console.log(e) };
  }
                       }