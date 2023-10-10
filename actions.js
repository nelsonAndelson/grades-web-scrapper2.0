const {
  findElementByXPath,
  waitForSelector,
  typeInInput,
  submitForm,
} = require("./puppeteerUtils");
const { LOGIN_URL } = require("./config");

async function performLogin(page) {
  await page.goto(LOGIN_URL);

  const loginBtn = await findElementByXPath(
    page,
    '//a[@aria-label="Log in with Active Directory"]'
  );
  if (loginBtn) {
    await loginBtn.click();

    await typeEmailAndClickNext(page);
    await typePasswordAndSubmit(page);
  } else {
    console.error("Element not found.");
  }
}

async function typeEmailAndClickNext(page) {
  await typeInInput(page, "#i0116", "sura.ali@cmsdk12.org");
  const emailNextBtn = await waitForSelector(page, "#idSIButton9");
  await emailNextBtn.click();
}

async function typePasswordAndSubmit(page) {
  await typeInInput(page, "#i0118", "S25925ss");
  await page.waitForTimeout(2000);
  await submitForm(page);
  const yesBtn = await waitForSelector(page, "#idSIButton9");
  await yesBtn.click();
}

async function clickSchoology(page) {
  const hrefToFind =
    "https://clever.com/oauth/authorize?channel=clever-portal&client_id=7bc88bc05b84adc6a9fa&confirmed=true&district_id=55b7bcd43ca5be0100000ee6&redirect_uri=https%3A%2F%2Fsamlidp.clever.com%2Fsaml-schoology%2Foauth&response_type=code";

  try {
    const link = await page.waitForSelector(`a[href="${hrefToFind}"]`, {
      timeout: 5000,
    });

    await page.evaluate((link) => {
      link.removeAttribute("target");
    }, link);

    await link.click();

    // Wait for navigation to complete to the new URL
    await page.waitForNavigation();

    // Now, navigate to the desired route
    await page.goto("https://clevelandmetro.schoology.com/grades/grades");
  } catch (error) {
    console.error("Element not found within the specified timeout.");
  }
}

module.exports = {
  performLogin,
  clickSchoology,
};
