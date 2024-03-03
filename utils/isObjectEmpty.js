function isEmptyWithAccuracy(obj, accuracy = 0.8) {
  // Get all keys of the object
  const keys = Object.keys(obj);

  // Calculate the threshold for considering keys as empty
  const threshold = Math.ceil(keys.length * accuracy);

  // Count the number of empty keys
  let emptyCount = 0;

  // Iterate through each key and check if its value is empty
  keys.forEach((key) => {
    const value = obj[key];
    if (isEmpty(value)) {
      emptyCount++;
    }
  });

  // Check if the number of empty keys exceeds the threshold
  return emptyCount >= threshold;
}

// Helper function to check if a value is empty
function isEmpty(value) {
  if (
    value === "" ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === "object" && Object.keys(value).length === 0)
  ) {
    return true;
  }
  return false;
}

module.exports = {
  isEmptyWithAccuracy,
  isEmpty,
};
