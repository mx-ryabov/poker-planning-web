/* eslint-disable @typescript-eslint/no-require-imports */
const path = require("path");

const buildEslintCommand = (filenames) =>
  `eslint --fix ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" ")}`;

module.exports = {
  // Frontend TypeScript files
  "apps/frontend/**/*.{ts,tsx}": [buildEslintCommand, "tsc --noEmit"],
};
