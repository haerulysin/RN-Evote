/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './src/screens/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors:{
        bluechain:'#25AAE1',
        bluechain50:'#a8ddf3'
      },
      height:{
        '9/10' : '10%'
      }
    },
  },
  plugins: [],
}

