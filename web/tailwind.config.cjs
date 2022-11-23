/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'src/**/*.tsx',
    './index.html'
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    extend: {
      backgroundImage: {
        galaxy: "url('/background-galaxy.png')",
        'name-gradient': 'linear-gradient(180deg, #AC209E 12%, #000000 323%)',
        'nlw-gradient': 'linear-gradient(89.86deg, #9572FC 23.08%, #43E7AD 33.94%, #E1D55D 44.57%)',
        'game-gradient': 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%)',
      },
      colors: {
        'cor-botoes': '#C026D3',
      }
    },
  },
  plugins: [],
}
