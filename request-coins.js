const axios = require("axios");

module.exports = {
  /**
   * 
   * @param {string} url 
   * @returns {string} - json data in string format
   */
  getCoins: (url) => {
    return axios.get(url);
  },
};
