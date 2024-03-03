const { fetchLinkedinProfile } = require("./script/linkedin-scrap");
const fs = require("fs");
const { ArrayFile } = require("./utils/ArrayFile");

const main = async () => {
  const users = require("./prod-slacks.json");
  const profiles = new ArrayFile("profiles.json");
  for (let i = 0; i < users.length; ++i) {
    let linkedUrl = users[i]?.linkedinUrl?.split("/");
    let userId = linkedUrl[linkedUrl.length - 1];
    if (!userId) {
      console.log(`No linkedin profile for ${users[i].name}`);
      continue;
    }
    let profile = profiles.find((p) => p.userId === userId);
    if (profile) {
      console.log(`Profile for ${userId} already exists`);
      continue;
    }
    console.log(`Fetching profile for ${userId}`);
    console.log("Processing request", i + 1, "of", users.length, "requests");
    const populatedProfile = await fetchLinkedinProfile(userId, null, i);
    if (typeof populatedProfile === "boolean" && !populatedProfile) {
      console.log(`Profile for ${userId} not found`);
      console.log("Waiting for 15 seconds before next request");
      await new Promise((resolve) => setTimeout(resolve, 15000));
    } else {
      profiles.push({ ...populatedProfile, userId, url: users[i]?.linkedinUrl });
      console.log(`Profile for ${userId} fetched and saved`);
    }
  }
};

main();
