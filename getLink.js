const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

const getLink = async (nameOfVideo) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    `https://www.youtube.com/results?search_query=${nameOfVideo}`
  );

  const content = await page.content();
  const getContent = cheerio.load(content);
  await browser.close();
  return `https://www.youtube.com${getContent("#video-title").attr("href")}`;
};

module.exports.getLink = getLink;
