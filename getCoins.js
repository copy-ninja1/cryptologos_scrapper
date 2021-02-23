const { get } = require("./request-coins");

/**
 * @returns {promise} resolves to an array of coins
 */
const getAllCoins = () => {
  console.log("getting coins...");

  let coins = get("https://cryptologos.cc/_cmc.js?v=012")
    .then(({ data }) => {
      let storeCoins = [];

      let obj = `[${data.replace("cc_coins =", "").slice(2, -2)}]`;

      let objArr = JSON.parse(obj);
      //   coins = objArr[0];
      for (var key of Object.keys(objArr[0])) {
        var t = objArr[0][key];
        var urlKey = key;
        storeCoins.push({ ...t, urlKey });
      }
      return storeCoins;
    })
    .catch((err) => {
      console.error(err);
    });
  return coins;
};
module.exports = { getAllCoins };
