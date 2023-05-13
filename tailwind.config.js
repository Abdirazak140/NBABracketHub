/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'regal-blue': '#243c5a',
      },
      spacing: {
        '100': '33rem',
        '13': '45px',
        '26': '80px',
        '37': '145px',
        '70': '280px',
        'final': '208px'
      }
    },
  },
  plugins: [],
}

