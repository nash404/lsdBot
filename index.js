const { Telegraf } = require("telegraf");
const { downloadAndSend } = require("./download");
const config = require("./config/config");
const bot = new Telegraf(config.token);

const startMessage = (ctx) =>
  ctx.reply(
    "Добро пожаловать\nОтправьте мне ссылку или название видео с YouTube, и я пришлю вам аудио из этого видео"
  );

bot.start(async (ctx) => await startMessage(ctx));

bot.on("message", async (ctx) => {
  let message = ctx.message.text;
  await downloadAndSend(ctx, message);
});

bot.launch();
