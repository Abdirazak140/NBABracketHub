/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'regal-blue': '#243c5a',
        'cadet': '#171738',
        'federal': '#2E1760',
        'zaffre': '#3423A6',
        'glucose': '#7180B9',
        'honeydue-shade': '#fcfefc',
        'honeydue': '#DFF3E4',
        'honeydue-transparent': 'rgba(240, 230, 140, 0.3)',
        'glucose-transparent': 'rgba(113, 128, 185, 0.2)'
      },
      spacing: {
        '100': '33rem',
        '13': '45px',
        '26': '80px',
        '37': '145px',
        '70': '280px',
        'final': '208px',
        'h2': '500px',
        'login-h': '500px'
      },
      borderRadius: {
        'home': '100px'
      }
    },
  },
  plugins: [],
}

