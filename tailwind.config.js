/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors:{
        bluechain:'#4086FF',
      },
      height:{
        '9/10' : '10%'
      }
    },
  },
  plugins: [],
}

