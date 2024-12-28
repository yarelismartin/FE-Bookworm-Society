/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Arsenal SC"', 'serif'],
      },
    },
  },
  plugins: [
    // eslint-disable-next-line import/no-extraneous-dependencies, global-require
    require('daisyui'),
  ],
});
