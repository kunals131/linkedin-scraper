const { SELECTORS, LINKEDIN_BASE_URL: url } = require("../config");
const cheerio = require("cheerio");
exports.getExperience = async (browser, userId) => {
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768 });

    const updatedUrl = `${url}/${userId}/details/experience`;
    console.log("Redericting to experience page");
    await page.goto(updatedUrl);
    await page.waitForTimeout(1000);
    console.log("Redirected");
    const htmlCotent = await page.content();
    const $ = cheerio.load(htmlCotent);
    const experience = [];
    console.log();
    $(SELECTORS.EXPERIENCE_LISTS).each((i, el) => {
      const ele = $(el);
      experience.push({
        title:
          ele
            .find(
              "div > div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > div > div > div > div > div > span:nth-child(1)"
            )
            ?.text() || "",
        company:
          ele
            .find(
              "div > div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > div > span:nth-child(2) > span:nth-child(1)"
            )
            ?.text() || "",
        duration:
          ele
            .find(
              "div > div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > div > span:nth-child(3) > span.pvs-entity__caption-wrapper"
            )
            ?.text() || "",
        location:
          ele
            .find(
              "div > div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > div > span:nth-child(4) > span:nth-child(1)"
            )
            ?.text() || "",
        description:
          ele
            .find(
              "div > div > div.display-flex.flex-column.full-width.align-self-center > div.pvs-list__outer-container.pvs-entity__sub-components > ul > li:nth-child(1) > div > ul > li > div > div > div > span:nth-child(1)"
            )
            ?.text() || "",
      });
    });
    return experience;
  } catch (err) {
    console.log(err);
    return [];
  }
};
