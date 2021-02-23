const { getAllCoins } = require("./getCoins");
const { save } = require("./save-coins");

const scraperObject = {
  async scraper(browser) {
    let page = await browser.newPage();

    let scrapedData = [];
    // Wait for the required DOM to be rendered
    async function scrapeCurrentPage() {
      let coins = [];
      //   get all the coins without its image
      await getAllCoins().then((data) => {
        coins = data;
      });

      // Loop through each of those links, open a new page instance and get the relevant data from them
      let pagePromise = (link, coin) =>
        new Promise(async (resolve, reject) => {
          let dataObj = {};
          let newPage = await browser.newPage();
          await newPage.goto(link, { waitUntil: "domcontentloaded" });
          await newPage.waitForSelector(".site-content");

          let urls = await newPage.$$eval("div.product-content", (links) => {
            // debugger;
            var img = {};

            // Extract the links from the data

            for (var i = 0; i <= links.length; i++) {
              if (i == 0) {
                // logo_png
                img.logo_png = links[i].querySelector("a").href;
              }
              if (i == 1) {
                img.logo_svg = links[i].querySelector("a").href;
              }
            }
            return img;
          });

          //remove unused object keys
          delete coin.meta;
          delete coin.urlKey;
          dataObj = { ...coin, symbol: coin.symbol.toLowerCase(), ...urls };

          resolve(dataObj);

          //close the current tab after use
          await newPage.close();
        });

      for (index in coins) {
        let currentPageData = await pagePromise(
          `https://cryptologos.cc/${coins[index].urlKey}`,
          coins[index]
        );
        if (index == 1) {
          console.log("Please be patient getting images ....");
        }
        if (index == 100) {
          console.log("Almost done");
        }
        if (index == coins.length - 1) {
          console.log("done");
        }
        scrapedData.push(currentPageData);
      }

      await page.close();
      return scrapedData;
    }
    let data = await scrapeCurrentPage();
    // console.log("data : ", data);

    //save coin to file
    save("coins", data);
    // return data;
  },
};

module.exports = scraperObject;
