const { fetchLinkedinProfile } = require("./script/linkedin-scrap");
const fs = require("fs");

fetchLinkedinProfile("omlondhe", (data) => {
  fs.writeFileSync("om.json", JSON.stringify(data), {
    encoding: "utf-8",
  });
});
