/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        urbanist: ['Urbanist-Regular', 'sans-serif'],
        'urbanist-bold': ['Urbanist-Bold', 'sans-serif'],
        'urbanist-extrabold': ['Urbanist-ExtraBold', 'sans-serif'],
        'urbanist-medium': ['Urbanist-Medium', 'sans-serif'],
        'urbanist-semibold': ['Urbanist-SemiBold', 'sans-serif'],
        'urbanist-light': ['Urbanist-Light', 'sans-serif']
      },
      colors: {
        primary: '#102632',
        secondary: '#17CE92',
        tertiary: '#FFFFFF',
        quaternary: '#35383F'
      }
    }
  },
  plugins: []
};
