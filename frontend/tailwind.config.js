/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: ["row-start-1", "row-start-2", "row-start-3", "row-start-4", "row-start-5"],
  theme: { extend: {} },
  plugins: [require("daisyui")],
}
