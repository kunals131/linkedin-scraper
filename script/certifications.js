const { SELECTORS, LINKEDIN_BASE_URL:url } = require("../config");
const cheerio = require("cheerio");

exports.getCertifications = async (page, userId) => {
  try {
    const updatedUrl = `${url}/${userId}/details/certifications`;
    console.log("Redericting to certifications page");
    await page.goto(updatedUrl);
    await page.waitForTimeout(2000);
    console.log("Redirected");
    const htmlCotent = await page.content();
    const $ = cheerio.load(htmlCotent);
    const certifications = [];
    $(SELECTORS.EXPERIENCE_LISTS).each((i, el) => {
      const element = $(el);
      certifications.push({
        title:
          element
            .find(
              "div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > a > div > div > div > div > span:nth-child(1)"
            )
            ?.text() || "",
        issuer:
          element
            .find(
              "div > div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > a > span:nth-child(2) > span:nth-child(1)"
            )
            ?.text() || "",
        link:
          element
            .find(
              "div > div.display-flex.flex-column.full-width.align-self-center > div.pvs-list__outer-container.pvs-entity__sub-components > ul > li:nth-child(1) > div > div > a"
            )
            ?.attr("href") || "",
      });
    });
    // console.log(certifications)'
    return certifications;
  } catch (err) {
    console.log(err);
    return [];
  }
};
