const puppeteer = require("puppeteer");
const fs = require("fs");
const { SELECTORS } = require("../config");
const cheerio = require("cheerio");
const { getProjects } = require("./projects");
const { getEducation } = require("./education");
const { getExperience } = require("./experience");
const { getAwards } = require("./awards");
const { getCertifications } = require("./certifications");

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
  console.log(`Running for ${userId}..`, onSuccess)
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
    await page.waitForTimeout(2000);
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
    const projects = await getProjects(page, userId);
    const education = await getEducation(page, userId);
    const experience = await getExperience(page, userId);
    const awards = await getAwards(page, userId);
    const certifications = await getCertifications(page, userId);
    scrappedData["projects"] = projects;
    scrappedData["education"] = education;
    scrappedData["experience"] = experience;
    scrappedData["awards"] = awards;
    scrappedData["certifications"] = certifications;
    console.log(scrappedData);
    if (onSuccess) {
      onSuccess(scrappedData);
    }
    await browser.close();
    return scrappedData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
