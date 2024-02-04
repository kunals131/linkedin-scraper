const SELECTORS = {
  NAME_SELECTOR:
    ".ember-view .pv-text-details__about-this-profile-entrypoint h1",
  BIO_SELECTOR:
    "#profile-content .pv-profile > div > div > main div.ph5 > div.mt2.relative > div:nth-child(1) > div.text-body-medium.break-words",
  LOCATION_SELECTOR:
    ".mt2 > span.text-body-small.inline.t-black--light.break-words",
  ABOUT:
    "#profile-content > div > div.scaffold-layout.scaffold-layout--breakpoint-xl.scaffold-layout--main-aside.scaffold-layout--reflow.pv-profile.pvs-loader-wrapper__shimmer--animate > div > div > main > section:nth-child(3) > div.display-flex.ph5.pv3 > div > div > div > span:nth-child(1)",
  EXPERIENCE_LISTS:
    "#profile-content > div > div.scaffold-layout.scaffold-layout--breakpoint-xl.scaffold-layout--main-aside.scaffold-layout--reflow.pv-profile.break-words > div > div > main > section > div.pvs-list__container > div > div.scaffold-finite-scroll__content > ul .artdeco-list__item",
  EDUCATION_LIST:
    "#profile-content > div > div.scaffold-layout.scaffold-layout--breakpoint-xl.scaffold-layout--main-aside.scaffold-layout--reflow.pv-profile.break-words > div > div > main > section > div.pvs-list__container > div > div.scaffold-finite-scroll__content > ul .artdeco-list__item",
  CERTIFICATIONS_LIST:
    "#profile-content div > div > main > section > div.pvs-list__container > div > div.scaffold-finite-scroll__content > ul .artdeco-list__item",
  createExpItemSelector: (index) => {
    return {
      TITLE: `#profile-content > div > div.scaffold-layout.scaffold-layout--breakpoint-xl.scaffold-layout--main-aside.scaffold-layout--reflow.pv-profile.pvs-loader-wrapper__shimmer--animate > div > div > main > section:nth-child(4) > div.pvs-list__outer-container > ul > li:nth-child(${index}) > div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > div > div > div > div > div > span:nth-child(1)`,
      COMPANY_STATUS: `#profile-content > div > div.scaffold-layout.scaffold-layout--breakpoint-xl.scaffold-layout--main-aside.scaffold-layout--reflow.pv-profile.pvs-loader-wrapper__shimmer--animate > div > div > main > section:nth-child(4) > div.pvs-list__outer-container > ul > li:nth-child(${index}) > div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > div > span:nth-child(2) > span:nth-child(1)`,
      DURATION: `#profile-content > div > div.scaffold-layout.scaffold-layout--breakpoint-xl.scaffold-layout--main-aside.scaffold-layout--reflow.pv-profile.pvs-loader-wrapper__shimmer--animate > div > div > main > section:nth-child(4) > div.pvs-list__outer-container > ul > li:nth-child(${index}) > div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > div > span:nth-child(3) > span.pvs-entity__caption-wrapper`,
      LOCATION: `#profile-content > iv > div.scaffold-layout.scaffold-layout--breakpoint-xl.scaffold-layout--main-aside.scaffold-layout--reflow.pv-profile.pvs-loader-wrapper__shimmer--animate > div > div > main > section:nth-child(4) > div.pvs-list__outer-container > ul > li:nth-child(${index}) > div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > div > span:nth-child(4) > span:nth-child(1)`,
      DESCRIPTION: `##profile-content > div > div.scaffold-layout.scaffold-layout--breakpoint-xl.scaffold-layout--main-aside.scaffold-layout--reflow.pv-profile.pvs-loader-wrapper__shimmer--animate > div > div > main > section:nth-child(4) > div.pvs-list__outer-container > ul > li:nth-child(1) > div > div.display-flex.flex-column.full-width.align-self-center > div.pvs-list__outer-container.pvs-entity__sub-components > ul > li:nth-child(1) > div > ul > li > div > div > div > div > span:nth-child(1)`,
    };
  },
};

const LINKEDIN_PATHS = {
  EDUCATION: "/details/education",
  EXPERIENCE: "/details/experience",
  SKILLS: "/details/skills",
};

module.exports = {
  SELECTORS,
};
