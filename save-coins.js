const fs = require("fs");
module.exports = {
  /**
   *
   * @param { string } path - file path
   * @param { array } data - data to be stored 
   */
  save: (path, data) => {
    try {
      fs.writeFileSync(`${path}.json`, JSON.stringify(data));
    } catch (err) {
      console.error(err);
    }
  },
};
