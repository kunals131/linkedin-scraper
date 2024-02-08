const fs = require("fs");

class ArrayFile {
  constructor(filePath) {
    this.filePath = filePath;
  }

  readArray() {
    try {
      if (!fs.existsSync(this.filePath)) {
        // If file doesn't exist, create a new file with an empty array
        fs.writeFileSync(this.filePath, "[]", "utf8");
        return [];
      }
      const data = fs.readFileSync(this.filePath, "utf8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error reading array:", error);
      return [];
    }
  }

  writeArray(array) {
    try {
      const data = JSON.stringify(array);
      fs.writeFileSync(this.filePath, data, "utf8");
    } catch (error) {
      console.error("Error writing array:", error);
    }
  }

  push(item) {
    const array = this.readArray();
    array.push(item);
    this.writeArray(array);
  }

  pop() {
    const array = this.readArray();
    const poppedItem = array.pop();
    this.writeArray(array);
    return poppedItem;
  }

  filter(callback) {
    const array = this.readArray();
    const filteredArray = array.filter(callback);
    return filteredArray;
  }

  find(predicate) {
    const array = this.readArray();
    const foundItem = array.find(predicate);
    return foundItem || false;
  }

  // You can add more methods like delete, update, etc. as needed
}

module.exports = {
  ArrayFile,
};
