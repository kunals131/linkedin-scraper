function extractEmails(text) {
  // Regular expression to match email addresses
  var emailRegex = /[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,}/g;

  // Using match method to extract emails from the string
  var emails = text.match(emailRegex);

  // Returning the array of extracted emails
  return emails || [];
}

module.exports = {
  extractEmails,
};
