const ytdl = require("ytdl-core");
const getLink = require("./getLink.js").getLink;
const checkWhatIs = require("./checkWhatIs.js").checkWhatIs;
const fs = require("fs");

const downloadAndSend = async (ctx, messageFromUser) => {
  let link;
  let message = "Wait",
    info,
    infoAboutMessage = await ctx.reply(message);

  let counter = 0;
  let processInfo = setInterval(() => {
    if (counter != 3) {
      message += ".";
      counter += 1;
    } else {
      message = "Wait";
      counter = 0;
    }
    ctx.telegram.editMessageText(
      infoAboutMessage.chat.id,
      infoAboutMessage.message_id,
      infoAboutMessage.message_id,
      message
    );
  }, 500);

  let linkOrName = await checkWhatIs(messageFromUser);
  if (linkOrName == "Name") link = await getLink(messageFromUser);
  else link = messageFromUser;

  try {
    info = await ytdl.getInfo(link);
  } catch (error) {
    await ctx.reply("Ошибка\nНичего не найдено или видео слишком длинное");
  }

  ytdl(link)
    .pipe(fs.createWriteStream("video.mp3"), { quality: 18 })
    .on("finish", async () => {
      try {
        await ctx.replyWithAudio({
          source: "./video.mp3",
          filename: info.videoDetails.title,
        });
      } catch (error) {
        console.log(error);
      }

      clearInterval(processInfo);
      await ctx.deleteMessage(infoAboutMessage.message_id);
    });
};

module.exports.downloadAndSend = downloadAndSend;
