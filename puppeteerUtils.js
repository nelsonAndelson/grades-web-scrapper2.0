async function findElementByXPath(page, xpath) {
  const elements = await page.$x(xpath);
  return elements.length > 0 ? elements[0] : null;
}

async function waitForSelector(page, selector) {
  return await page.waitForSelector(selector);
}

async function typeInInput(page, selector, text) {
  const input = await waitForSelector(page, selector);
  await input.type(text);
}

async function submitForm(page) {
  await page.evaluate(() => {
    const form = document.querySelector("form");
    if (form) {
      form.submit();
    }
  });
}

module.exports = {
  findElementByXPath,
  waitForSelector,
  typeInInput,
  submitForm,
};
