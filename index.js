const puppeteer = require("puppeteer");
const { performLogin, clickSchoology } = require("./actions");
const { collectGrades } = require("./dataScrapeUtils");

async function run() {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  try {
    await performLogin(page);
    await clickSchoology(page);
    await collectGrades(page);
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    // await browser.close();
  }
}

run();
