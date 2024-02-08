const { LINKEDIN_BASE_URL, SELECTORS } = require("../config");
const cheerio = require("cheerio");
exports.getProjects = async (page, userId) => {
  try {
    const updatedUrl = `${LINKEDIN_BASE_URL}/${userId}/details/projects/`;
    console.log("Redericting to Projects page");
    await page.goto(updatedUrl);
    await page.waitForTimeout(2000);
    console.log("Redirected");
    const htmlCotent = await page.content();
    const $ = cheerio.load(htmlCotent);
    const projects = [];
    $(SELECTORS.EXPERIENCE_LISTS).each((i, el) => {
      const element = $(el);
      projects.push({
        title:
          element
            .find(
              "div > div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > div.display-flex.flex-column.full-width > div > div > div > div > span:nth-child(1)"
            )
            ?.text() || "",
        duration:
          element
            .find(
              "div > div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > div.display-flex.flex-column.full-width > span > span:nth-child(1)"
            )
            ?.text() || "",
        url:
          element
            .find(
              "div > div > div.display-flex.flex-column.full-width.align-self-center > div.pvs-list__outer-container.pvs-entity__sub-components > ul > li:nth-child(1) > div > div > a"
            )
            ?.attr("href") || "",
        description:
          element
            .find(
              "div > div > div.display-flex.flex-column.full-width.align-self-center > div.pvs-list__outer-container.pvs-entity__sub-components > ul > li:nth-child(2) > div > ul > li > div > div > div > span:nth-child(1)"
            )
            ?.text() || "",
      });
    });
    // console.log(projects);
    return projects;
  } catch (err) {
    console.log(err);
    return [];
  }
};
