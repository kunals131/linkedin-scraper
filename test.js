const { LinkedInProfileScraper } = require("linkedin-profile-scraper");

// Plain Javascript
// const { LinkedInProfileScraper } = require('linkedin-profile-scraper')

(async () => {
  const scraper = new LinkedInProfileScraper({
    sessionCookieValue:
      "AQEDATMhoWsCcZK7AAABjWpE3LEAAAGNjlFgsU0Az--jfT0DXnxZpI5swDCLI4UlUSuNwJoUaU9WVmpqX17TW7QyedPQanCI09nZROeXS0hnVAQk1lSS55_bE4xo6jKIfcxF37osPCkbOoRdDWkpna4j",
    keepAlive: false,
  });

  // Prepare the scraper
  // Loading it in memory
  await scraper.setup();

  const result = await scraper.run(
    "https://www.linkedin.com/in/brendan-foody-2995ab10b/"
  );

  console.log(result);
})();
