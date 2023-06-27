let markdown = "";

const createMarkdownFromQuestion = () => {
  const title = document.querySelector("#title").value;
  let problemStatement = document.querySelector("#question").value;
  let inputFormat = document.querySelector("#input-format").value;
  let outputFormat = document.querySelector("#output-format").value;
  let constraints = document.querySelector("#constraints").value;
  const testcases = document.querySelectorAll(".testcase");
  const sampleTestcases = [];
  testcases.forEach((testcase) => {
    const input = testcase.querySelector("#sample-input").value;
    const output = testcase.querySelector("#sample-output").value;
    const explanation = testcase.querySelector("#explanation").value;
    sampleTestcases.push({ input, output, explanation });
  });

  const markdownTemplate = `
# ${title}
## Problem Statement
${problemStatement}
${inputFormat ? `## Input Format` : ""}
${inputFormat}
${outputFormat ? `## Output Format` : ""}
${outputFormat}
${constraints ? `## Constraints` : ""}
${constraints}
## Sample Testcases
${sampleTestcases
  .map(
    (testcase, index) => `
### Input ${index + 1}
\`\`\`
${testcase.input}
\`\`\`
### Output ${index + 1}
\`\`\`
${testcase.output}
\`\`\`
${
  testcase.explanation
    ? `### Explanation ${index + 1}
${testcase.explanation}`
    : ""
}
    `
  )
  .join("")}
    `;

  const preview = document.querySelector(".preview");
  const converter = new showdown.Converter();
  preview.innerHTML = converter.makeHtml(markdownTemplate);
  markdown = markdownTemplate;
};

const addTestcase = () => {
  const sampleTestcases = document.querySelector(".sample-testcases");
  const testcase = document.createElement("div");
  testcase.classList.add("testcase");
  testcase.innerHTML = `
        <textarea name="sample-input" id="sample-input" cols="30" rows="5" placeholder="Sample Input"></textarea>
        <textarea name="sample-output" id="sample-output" cols="30" rows="5" placeholder="Sample Output"></textarea>
        <textarea name="explanation" id="explanation" cols="30" rows="5" placeholder="Explanation"></textarea>
        <span class="remove-testcase">Remove</span>
    `;
  const removeBtn = testcase.querySelector(".remove-testcase");
  removeBtn.addEventListener("click", removeTestcase);
  const addTestcaseBtn = document.querySelector(".add-testcase");
  sampleTestcases.insertBefore(testcase, addTestcaseBtn);
  const textareas = testcase.querySelectorAll("textarea");
  textareas.forEach((textarea) => {
    textarea.addEventListener("change", createMarkdownFromQuestion);
  });
};

const removeTestcase = (e) => {
  const testcase = e.target.parentElement;
  testcase.remove();
};

const addTestcaseBtn = document.querySelector(".add-testcase");
addTestcaseBtn.addEventListener("click", addTestcase);
const removeTestcaseBtns = document.querySelectorAll(".remove-testcase");
removeTestcaseBtns.forEach((btn) => {
  btn.addEventListener("click", removeTestcase);
});

const inputs = document.querySelectorAll("input");
inputs.forEach((input) => {
  input.addEventListener("change", createMarkdownFromQuestion);
});
const textareas = document.querySelectorAll("textarea");
textareas.forEach((textarea) => {
  textarea.addEventListener("change", createMarkdownFromQuestion);
});

const copyBtn = document.querySelector(".copy");
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(markdown);
  alert("Copied to clipboard");
});
