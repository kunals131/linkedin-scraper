const { fetchLinkedinProfile } = require("./script/linkedin-scrap");
const { ArrayFile } = require("./utils/ArrayFile");

async function mainCall() {
  const resultsFile = new ArrayFile("profiles.json");
  const usersFile = new ArrayFile("prod-slack-users.json");
  const users = usersFile.readArray()

  for(let user of users) {
    if (user?.linkedinUrl) {
      const splittedUrl = user?.linkedinUrl?.split("/");
      const linkedinId = splittedUrl?.[splittedUrl?.length-1];
      if (!linkedinId) {
        console.error("Error: Linkedin Id was not found!");
        return;
      }
      console.log("Running search for linkedinId", linkedinId);
      await fetchLinkedinProfile(linkedinId, (scrappedData)=>{
        resultsFile.push({...scrappedData, id: linkedinId})
      })
    }else {
      console.log("No linkedin url for user", user?.fullName);
    }
  }
}

mainCall()