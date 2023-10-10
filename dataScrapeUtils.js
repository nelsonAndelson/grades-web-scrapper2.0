async function collectGrades(page) {
  await page.waitForSelector("#main-inner");

  const courseTitles = await page.$$eval(
    "div.gradebook-course-title",
    (elements) =>
      elements.map((element) => {
        const className =
          element.parentNode.children[1].children[1].children[0].children[1]
            .children[0].className;

        // Check if the class name is equal to "awarded-grade"
        if (className === "awarded-grade") {
          return element.textContent.trim().split(":")[0];
        }
      })
  );

  // Filter out undefined values and get only the text content of elements with class "awarded-grade"
  const filteredCourseTitles = courseTitles.filter((title) => title !== null);

  const courseGrades = await page.$$eval(
    "span.course-grade-text + span.course-grade-value span.rounded-grade",
    (elements) =>
      elements.map((element) => {
        // Parse the text content as a float and round it
        const roundedGrade = Math.round(parseFloat(element.textContent)) + "%";
        return roundedGrade;
      })
  );

  const courseObject = {};

  for (let i = 0; i < filteredCourseTitles.length; i++) {
    courseObject[filteredCourseTitles[i]] = courseGrades[i];
  }

  console.log(courseObject);
}

module.exports = {
  collectGrades,
};
