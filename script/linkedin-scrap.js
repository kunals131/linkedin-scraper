const puppeteer = require("puppeteer");
const fs = require("fs");
const { SELECTORS } = require("../config");
const cheerio = require("cheerio");
const { getProjects } = require("./projects");
const { getEducation } = require("./education");
const { getExperience } = require("./experience");
const { getAwards } = require("./awards");
const { getCertifications } = require("./certifications");
const { getSkills } = require("./skills");

async function createBroswer() {
  try {
    return await puppeteer.launch({
      headless: true,
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
const url = "https://www.linkedin.com/in";

exports.fetchLinkedinProfile = async (userId, onSuccess) => {
  console.log(`Running for ${userId}..`, onSuccess);
  try {
    const browser = await createBroswer();
    const page = await browser.newPage();
    console.log("Opened Browser and page initailized");
    await page.setViewport({ width: 1366, height: 768 });

    const cookies = await fs.readFileSync("cookies.json");
    const deserializedCookies = JSON.parse(cookies);
    await page.setCookie(...deserializedCookies);
    console.log("Cookies are set.");

    await page.goto(`${url}/${userId}`);
    console.log("Wait for the main page load");
    await page.waitForTimeout(1000);
    console.log("Wait ended for main page");

    // Get the HTML content of the entire page
    const htmlContent = await page.content();
    const $ = cheerio.load(htmlContent);
    const scrappedData = {
      fullName: $(SELECTORS.NAME_SELECTOR).text(),
      bio: $(SELECTORS.BIO_SELECTOR).text()?.replace("\n", "")?.trim() || "",
      location:
        $(SELECTORS.LOCATION_SELECTOR)?.text()?.replace("\n", "")?.trim() || "",
      about: $(SELECTORS.ABOUT)?.text()?.replace("\n", "")?.trim() || "",
    };
    console.log("Scrapped the general details");
    const keys = [
      "projects",
      "education",
      "experience",
      "awards",
      "certifications",
      "skills",
    ];
    const promises = [
      getProjects(browser, userId).catch(() => []),
      getEducation(browser, userId).catch(() => []),
      getExperience(browser, userId).catch(() => []),
      getAwards(browser, userId).catch(() => []),
      getCertifications(browser, userId).catch(() => []),
      getSkills(browser, userId).catch(() => []),
    ];
    const results = await Promise.all(
      promises.map(async (promise, index) => {
        const result = await promise;
        return { [keys[index]]: result };
      })
    );

    // Combine all results into a single object
    const combinedResults = results.reduce(
      (acc, curr) => ({ ...acc, ...curr }),
      {}
    );
    console.log(combinedResults);
    const finalRes = { ...scrappedData, ...combinedResults };
    if (onSuccess) {
      onSuccess(finalRes);
    }
    await browser.close();
    return finalRes;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
