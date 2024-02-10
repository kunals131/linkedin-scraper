const { SELECTORS, LINKEDIN_BASE_URL: url } = require("../config");
const cheerio = require("cheerio");

exports.getEducation = async (browser, userId) => {
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768 });
    
    const updatedUrl = `${url}/${userId}/details/education`;
    console.log("Redericting to education page");
    await page.goto(updatedUrl);
    await page.waitForTimeout(1000);
    console.log("Redirected");
    const htmlCotent = await page.content();
    const $ = cheerio.load(htmlCotent);
    const education = [];
    console.log();
    $(SELECTORS.EXPERIENCE_LISTS).each((i, el) => {
      const ele = $(el);
      education.push({
        collegeName:
          ele
            .find(
              "div > div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > a > div > div > div > div > span:nth-child(1)"
            )
            ?.text() || "",
        degree:
          ele
            .find(
              "div > div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > a > span:nth-child(2) > span:nth-child(1)"
            )
            ?.text() || "",
        duration:
          ele
            .find(
              "div > div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > a > span.t-14.t-normal.t-black--light > span.pvs-entity__caption-wrapper"
            )
            ?.text() || "",
        grade:
          ele
            .find(
              "div > div > div.display-flex.flex-column.full-width.align-self-center > div.pvs-list__outer-container.pvs-entity__sub-components > ul > li:nth-child(1) > div > div > div > div > div > div > span:nth-child(1)"
            )
            ?.text() || "",
        description:
          ele
            .find(
              "div > div > div.display-flex.flex-column.full-width.align-self-center > div.pvs-list__outer-container.pvs-entity__sub-components > ul > li:nth-child(2) > div > ul > li > div > div > div > span:nth-child(1)"
            )
            ?.text() || "",
      });
    });
    return education;
  } catch (err) {
    console.log(err);
    return [];
  }
};
