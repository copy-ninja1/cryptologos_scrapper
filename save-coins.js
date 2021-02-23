const fs = require("fs");
module.exports = {
  /**
   *
   * @param { string } path - file path
   * @param { array } data - json data in string format
   */
  save: (path, data) => {
    try {
      fs.writeFileSync(`${path}.json`, JSON.stringify(data));
    } catch (err) {
      console.error(err);
    }
  },
};
