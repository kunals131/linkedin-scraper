const { LINKEDIN_BASE_URL, SELECTORS } = require("../config");
const cheerio = require("cheerio");

async function scrollInfinitely(page, scrollDelay = 2000) {
  try {
    let previousHeight;
    while (true) {
      previousHeight = await page.evaluate("document.body.scrollHeight");
      await page.evaluate("window.scrollTo(0, document.body.scrollHeight)");
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

exports.getSkills = async (page, userId) => {
  try {
    const updatedUrl = `${LINKEDIN_BASE_URL}/${userId}/details/skills/`;
    console.log("Redericting to Skills page");
    await page.goto(updatedUrl);
    await page.waitForTimeout(2000);
    console.log("Redirected");
    await scrollInfinitely(page);
    const htmlCotent = await page.content();
    const $ = cheerio.load(htmlCotent);
    const SKILL_SELECTOR = `.scaffold-finite-scroll__content ul  li a[data-field="skill_page_skill_topic"] .visually-hidden`;
    const skills = [];
    $(SKILL_SELECTOR).each((i, el) => {
      const ele = $(el);
      skills.push(ele?.text());
    });
    return skills;
  } catch (err) {
    console.log(err);
    return [];
  }
};
