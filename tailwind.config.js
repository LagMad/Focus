/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        SfProDisplay: ["SfProDisplay"]
      },
      colors: {
        'cust-black' : '#121212',
        'cust-white' : '#FAFAFA',

        'cust-pink-lightest' : '#FFF5FB',
        'cust-pink-lighter' : '#FAA0DA',
        'cust-pink-light' : '#ED5CBA',
        'cust-pink-normal' : '#D7319D',
        'cust-pink-dark' : '#B3197D',
        'cust-pink-darker' : '#870E5D',

        'cust-blue-lightest' : '#F5F5FF',
        'cust-blue-lighter' : '#A2A0FA',
        'cust-blue-light' : '#5E5CED',
        'cust-blue-normal' : '#3431D7',
        'cust-blue-dark' : '#1B19B3',
        'cust-blue-darker' : '#100E87',
      },
      backgroundImage: {
        'HomeBG' : "url('/src/assets/HomeBG.png')"
      }
    },
  },
  plugins: [],
}