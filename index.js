const { getCoins } = require("./request-coins");
const { save } = require("./save-coins");

getCoins("https://cryptologos.cc/_cmc.js?v=012")
  .then(({ data }) => {
    let obj = `[${data.replace("cc_coins =", "").slice(2, -2)}]`;
    let objArr = JSON.parse(obj);

    save("coins", formatData(objArr[0]));
  })
  .catch((err) => {
    console.error(err);
  });

/**
 * @param {object}
 * @returns {array}
 */
function formatData(obj) {
  let newObj = [];

  for (var key of Object.keys(obj)) {
    newObj.push(obj[key]);
  }
  return newObj;
}
