import path from "path";
import fs from "fs/promises";

/**
 * @typedef {Object} Example
 * @property {string} dirPath
 * @property {string} template
 * @property {Benchmark} benchmark
 */

/**
 * @typedef {Object} Benchmark
 * @property {Record<string, any>} inputs
 * @property {Record<string, Fn<any, any>>} fns
 */

/**
 * @callback Fn
 * @template T
 * @template U
 * @param {T} x
 * @returns {U}
 */

/**
 * @typedef {Object} Results
 * @property {string[]} fnNames
 * @property {ResultsItem[]} items
 */

/**
 * @typedef {Object} ResultsItem
 * @property {string} inputName
 * @property {boolean} success
 * @property {Record<string, number>} durations
 */

async function main() {
  let success = true;
  for (const { dirPath, benchmark, template } of await load_examples()) {
    console.log(dirPath);
    const results = get_results(benchmark);
    results.items.forEach((x) => (success = success && x.success));
    let readme = template.replace(
      "{{benchmark}}",
      render_results(results) + "\n\n_Benchmark run on Github actions_"
    );
    for (const [name, fn] of Object.entries(benchmark.fns)) {
      readme = readme.replace(`{{code_${name}}}`, fn.toString());
    }
    await fs.writeFile(path.join(dirPath, "README.md"), readme);
  }
  if (!success) process.exit(1);
}

main();

/**
 * @returns {Promise<Example[]>}
 */
async function load_examples() {
  const examples = [];
  for (const entry of await fs.readdir("examples", { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const dirPath = path.join(entry.parentPath, entry.name);
    const templatePath = path.join(dirPath, "template.md");
    const benchmarkPath = path.join(dirPath, "benchmark.js");
    if (!(await fileExists(templatePath, benchmarkPath))) continue;
    examples.push({
      dirPath,
      template: await fs.readFile(templatePath, "utf8"),
      benchmark: await import("./" + benchmarkPath),
    });
  }
  return examples;
}

/**
 * @param {Benchmark} benchmark
 * @returns {Results}
 */
function get_results({ inputs, fns }) {
  const items = [];
  for (const [inputName, input] of Object.entries(inputs)) {
    console.log(`  ${inputName}`);
    const outputs = [];
    const durations = {};
    for (const [fnName, fn] of Object.entries(fns)) {
      const start = performance.now();
      const output = fn(input);
      durations[fnName] = performance.now() - start;
      outputs.push(JSON.stringify(output));
      console.log(`    ${fnName}: ${durations[fnName].toFixed(3)}`);
    }
    const wrongOutputs = outputs.filter((x) => x !== outputs[0]);
    console.log(`    success: ${wrongOutputs.length === 0 ? "✅" : "❌"}`);
    items.push({
      inputName,
      durations,
      success: wrongOutputs.length === 0,
    });
  }
  const fnNames = Object.keys(fns);
  return { fnNames, items };
}

/**
 * @param {Results} results
 * @returns {string}
 */
function render_results({ fnNames, items }) {
  const table = [];
  table.push(["", ...fnNames]);
  for (const item of items) {
    table.push([
      item.inputName,
      ...fnNames.map((name) =>
        item.success ? item.durations[name].toFixed(3) + " ms" : "N/A"
      ),
    ]);
  }
  return `<table>${table
    .map((row) => `<tr>${row.map((x) => `<td>${x}</td>`).join("")}</tr>`)
    .join("")}</table>`;
}

/**
 * @param {string[]} filenames
 * @returns {Promise<boolean>}
 */
async function fileExists(...filenames) {
  try {
    for (const filename of filenames) {
      await fs.access(filename);
    }
    return true;
  } catch {
    return false;
  }
}
