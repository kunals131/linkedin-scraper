const puppeteer = require("puppeteer");
const fs = require("fs");
const cheerio = require("cheerio");
const { setTimeout } = require("timers/promises");
const { extractEmails } = require("../../utils/extractEmails");

async function createBroswer() {
  try {
    return await puppeteer.launch({
      headless: false,
      timeout: 45 * 1000, //45 seconds
      args: [
        "--no-sandbox",
        "--disabled-setupid-sandbox",
        "--disable-gpu",
        "--disable-dev-shm-usage",
        "--proxy-server='direct://'",
        "--proxy-bypass-list=*",
      ],
      executablePath: "/usr/local/bin/chromium",
    });
  } catch (error) {
    throw error;
  }
}

const comments_list = ".comments-comments-list article.comments-comment-item";
const LOADMORE_BUTTON = ".comments-comments-list__load-more-comments-button";
const COMMENT_BODY = ".comments-comment-item-content-body";
const USER_NAME = ".comments-post-meta__name";

async function scrollInfinitely(page, scrollDelay = 2000) {
  try {
    let previousHeight;
    while (true) {
      previousHeight = await page.evaluate("document.body.scrollHeight");
      await page.evaluate("window.scrollTo(0, document.body.scrollHeight)");
      await page.click(LOADMORE_BUTTON);
      await page.waitForTimeout(scrollDelay);
      const newHeight = await page.evaluate("document.body.scrollHeight");
      if (newHeight === previousHeight) {
        console.log("No more content to load. Stopping scrolling.");
        break;
      }
    }
  } catch (e) {
    console.error(e);
  }
}

async function main() {
  const browser = await createBroswer();
  console.log("Created Browser");

  const page = await browser.newPage();
  console.log("Created Page");

  await page.setViewport({ width: 1366, height: 768 });
  const cookies = await fs.readFileSync("cookies.json");
  const deserializedCookies = JSON.parse(cookies);
  await page.setCookie(...deserializedCookies);
  await page.goto(
    "https://www.linkedin.com/feed/update/urn:li:activity:7161831395013718016/"
  );
  await setTimeout(2000);
    await scrollInfinitely(page);
  const htmlContent = await page.content();
  console.log("GOT Page Content");
  const $ = cheerio.load(htmlContent);
  const comments = [];
  $(comments_list).each((i, ele) => {
    const el = $(ele);
    const comment =
      el.find(COMMENT_BODY).text()?.replaceAll("\n", "")?.trim() || "";
    const memberId = el.find("a").attr("href");
    const user =
      String(el.find(USER_NAME).text())
        ?.replace("\n", "")
        ?.trim()
        ?.split("\n")?.[0] || "";
    comments.push({ comment, user, memberId, emails: extractEmails(comment) });
  });
  fs.writeFileSync("comments.json", JSON.stringify(comments));
  console.log("Successfully executed!");
}

main();
