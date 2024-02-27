/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    colors: {
      'text': '#ffffff',
      'background': '#557B83',
      'primary': '#A2D5AB',
      'secondary': '#39AEA9',
      'tertiary': '#E5EFC1',

      'darkText': '#ffffff',
      'darkBackground': '#2e3440',
      'darkPrimary': '#8c6a57',
      'darkSecondary': '#42648a',
      'darkTertiary': '#7b8f7b',

    },
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-roboto-mono)'],},
    },
  },
  plugins: [],
};
