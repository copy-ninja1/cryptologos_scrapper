const axios = require("axios");

module.exports = {
  /**
   * 
   * @param {string} url 
   * @returns  {promise}  html
   */
  get: (url) => {
    return axios.get(url);
  },
};
