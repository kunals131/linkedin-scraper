const puppeteer = require("puppeteer");
const fs = require("fs");
const { SELECTORS } = require("./config");
const cheerio = require("cheerio");

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
const url = "https://www.linkedin.com/in";

const getExperience = async (page, userId)=>{
  try {
  const updatedUrl = `${url}/${userId}/details/experience`;
  console.log('Redericting to experience page')
  await page.goto(updatedUrl);
  await page.waitForTimeout(2000);
  console.log('Redirected')
  const htmlCotent = await page.content();
  const $ = cheerio.load(htmlCotent);
  const experience = [];
  console.log()
  $(SELECTORS.EXPERIENCE_LISTS).each((i,el)=>{
    const ele = $(el);
    experience.push({
      title: ele.find("div > div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > div > div > div > div > div > span:nth-child(1)")?.text() || "",
      company: ele.find("div > div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > div > span:nth-child(2) > span:nth-child(1)")?.text() || "",
      duration: ele.find("div > div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > div > span:nth-child(3) > span.pvs-entity__caption-wrapper")?.text() || "",
      location: ele.find("div > div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > div > span:nth-child(4) > span:nth-child(1)")?.text() || "",
      description: ele.find("div > div > div.display-flex.flex-column.full-width.align-self-center > div.pvs-list__outer-container.pvs-entity__sub-components > ul > li:nth-child(1) > div > ul > li > div > div > div > span:nth-child(1)")?.text() || ""
    })
  })
  return experience;
}catch(err) {
  console.log(err);
  return []
}
}

const getEducation = async (page, userId)=>{
  try {
  const updatedUrl = `${url}/${userId}/details/education`;
  console.log('Redericting to experience page')
  await page.goto(updatedUrl);
  await page.waitForTimeout(2000);
  console.log('Redirected')
  const htmlCotent = await page.content();
  const $ = cheerio.load(htmlCotent);
  const education = [];
  console.log()
  $(SELECTORS.EXPERIENCE_LISTS).each((i,el)=>{
    const ele = $(el);
    education.push({
      collegeName: ele.find("div > div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > a > div > div > div > div > span:nth-child(1)")?.text() || "",
      degree: ele.find("div > div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > a > span:nth-child(2) > span:nth-child(1)")?.text() || "",
      duration: ele.find("div > div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > a > span.t-14.t-normal.t-black--light > span.pvs-entity__caption-wrapper")?.text() || "",
      grade: ele.find("div > div > div.display-flex.flex-column.full-width.align-self-center > div.pvs-list__outer-container.pvs-entity__sub-components > ul > li:nth-child(1) > div > div > div > div > div > div > span:nth-child(1)")?.text() || "",
      description: ele.find("div > div > div.display-flex.flex-column.full-width.align-self-center > div.pvs-list__outer-container.pvs-entity__sub-components > ul > li:nth-child(2) > div > ul > li > div > div > div > span:nth-child(1)")?.text() || ""
    })
  })
  return education;
}catch(err) {
  console.log(err);
  return []
}
}

const getSkills = async (page,userId)=>{
  const updatedUrl = `${url}/${userId}/details/skills`;
  console.log('Redericting to experience page')
  await page.goto(updatedUrl);
  await page.waitForTimeout(2000);
  console.log('Redirected')
  const htmlCotent = await page.content();
  const $ = cheerio.load(htmlCotent);
  const skills = [];
  console.log($(SELECTORS.EXPERIENCE_LISTS).length)
  return skills;
}

const getCertifications = async(page,userId)=>{
  try {
  const updatedUrl = `${url}/${userId}/details/certifications`;
  console.log('Redericting to certifications page')
  await page.goto(updatedUrl);
  await page.waitForTimeout(2000);
  console.log('Redirected')
  const htmlCotent = await page.content();
  const $ = cheerio.load(htmlCotent);
  const certifications = [];
  $(SELECTORS.EXPERIENCE_LISTS).each((i, el)=>{
    const element = $(el);
    certifications.push({
      title: element.find("div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > a > div > div > div > div > span:nth-child(1)")?.text() || "",
      issuer: element.find("div > div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > a > span:nth-child(2) > span:nth-child(1)")?.text() || "",
      link: element.find("div > div.display-flex.flex-column.full-width.align-self-center > div.pvs-list__outer-container.pvs-entity__sub-components > ul > li:nth-child(1) > div > div > a")?.attr("href") || "",
    })
  })
  // console.log(certifications)'
  return certifications
}catch(err) {
  console.log(err);
  return []
}
}

const getAwards = async(page,userId)=>{
  try {
  const updatedUrl = `${url}/${userId}/details/honors`;
  console.log('Redericting to certifications page')
  await page.goto(updatedUrl);
  await page.waitForTimeout(2000);
  console.log('Redirected')
  const htmlCotent = await page.content();
  const $ = cheerio.load(htmlCotent);
  const awards = [];
  $(SELECTORS.EXPERIENCE_LISTS).each((i,el)=>{
    const ele = $(el);
    awards.push({
      "title": ele.find("div > div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > div.display-flex.flex-column.full-width > div > div > div > div > span:nth-child(1)")?.text() || "",
      "issueDetails": ele.find("div > div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > div.display-flex.flex-column.full-width > span > span:nth-child(1)")?.text() || ""
    })
  })
  // console.log(awards)
  return awards
}catch(err) {
  console.log(err);
  return []
}
}

const getProjects = async(page, userId)=>{
  try {
  const updatedUrl = `${url}/${userId}/details/projects/`;
  console.log('Redericting to Projects page')
  await page.goto(updatedUrl);
  await page.waitForTimeout(2000);
  console.log('Redirected')
  const htmlCotent = await page.content();
  const $ = cheerio.load(htmlCotent);
  const projects = [];
  $(SELECTORS.EXPERIENCE_LISTS).each((i,el)=>{
    const element = $(el);
    projects.push({
      "title": element.find("div > div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > div.display-flex.flex-column.full-width > div > div > div > div > span:nth-child(1)")?.text() || "",
      "duration": element.find("div > div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > div.display-flex.flex-column.full-width > span > span:nth-child(1)")?.text() || "",
      "url": element.find("div > div > div.display-flex.flex-column.full-width.align-self-center > div.pvs-list__outer-container.pvs-entity__sub-components > ul > li:nth-child(1) > div > div > a")?.attr("href") || "",
      "description": element.find("div > div > div.display-flex.flex-column.full-width.align-self-center > div.pvs-list__outer-container.pvs-entity__sub-components > ul > li:nth-child(2) > div > ul > li > div > div > div > span:nth-child(1)")?.text() || "",
    });
  })
  // console.log(projects);
  return projects
}catch(err) {
  console.log(err);
  return []
}
}

// const getPublications = async(page,userId)=>{
//   const updatedUrl = `${url}/${userId}/details/publications/`;
//   console.log('Redericting to Projects page')
//   await page.goto(updatedUrl);
//   await page.waitForTimeout(4000);
//   console.log('Redirected')
//   const htmlCotent = await page.content();
//   const $ = cheerio.load(htmlCotent);
//   const publications = [];
//   $(SELECTORS.EXPERIENCE_LISTS).each()
// }


async function main(userId) {
  try {
    const browser = await createBroswer();
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768 });

    const cookies = await fs.readFileSync("cookies.json");
    const deserializedCookies = JSON.parse(cookies);
    await page.setCookie(...deserializedCookies);

    // await getCertifications(page,userId)
    // await getAwards(page,userId)
    // await getProjects(page,userId);
    // await getPublications(page, userId);


    await page.goto(`${url}/${userId}`);
    console.log("Going to wait");
    await page.waitForTimeout(3000);
    console.log("Wait done loaded");

    // Get the HTML content of the entire page
    const htmlContent = await page.content();
    const $ = cheerio.load(htmlContent);
    const scrappedData = {
      fullName: $(SELECTORS.NAME_SELECTOR).text(),
      bio: $(SELECTORS.BIO_SELECTOR).text()?.replace("\n", "")?.trim() || "",
      location: $(SELECTORS.LOCATION_SELECTOR)?.text()?.replace("\n", "")?.trim() || "",
      about: $(SELECTORS.ABOUT)?.text()?.replace("\n", "")?.trim() || "",
    };
    await getSkills(page,userId);
    // const projects = await getProjects(page,userId);
    // const education = await getEducation(page,userId)
    // const experience = await getExperience(page,userId)
    // const awards = await getAwards(page,userId);
    // const certifications = await getCertifications(page,userId);
    // scrappedData['projects'] = projects;
    // scrappedData['education'] = education;
    // scrappedData['experience'] = experience;
    // scrappedData['awards'] = awards;
    // scrappedData['certifications'] = certifications;
    console.log(scrappedData)
    fs.writeFileSync("scrappedData.json", JSON.stringify(scrappedData));
    // await browser.close()
  } catch (error) {
    console.error(error);
  }
}

main("omlondhe");
