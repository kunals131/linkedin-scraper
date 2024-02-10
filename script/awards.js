const { SELECTORS, LINKEDIN_BASE_URL: url } = require("../config");
const cheerio = require("cheerio");
exports.getAwards = async (browser, userId) => {
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768 });

    const updatedUrl = `${url}/${userId}/details/honors`;
    console.log("Redericting to awards page");
    await page.goto(updatedUrl);
    await page.waitForTimeout(1000);
    console.log("Redirected");
    const htmlCotent = await page.content();
    const $ = cheerio.load(htmlCotent);
    const awards = [];
    $(SELECTORS.EXPERIENCE_LISTS).each((i, el) => {
      const ele = $(el);
      awards.push({
        title:
          ele
            .find(
              "div > div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > div.display-flex.flex-column.full-width > div > div > div > div > span:nth-child(1)"
            )
            ?.text() || "",
        issueDetails:
          ele
            .find(
              "div > div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > div.display-flex.flex-column.full-width > span > span:nth-child(1)"
            )
            ?.text() || "",
      });
    });
    // console.log(awards)
    return awards;
  } catch (err) {
    console.log(err);
    return [];
  }
};
