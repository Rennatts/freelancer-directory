/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  mode: 'jit',
  purge: [
    './src/**/*.html',
    './src/**/*.tsx',
  ],
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 1024px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1280px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1280px) { ... }
    },
    fontSize: {
      xs: 14, 
      sm: 16, 
      md: 20, 
      xl: 25, 
      '2xl': 40
    },
    colors: {
      transparent: 'transparent',
      black: '#000',
      white: '#fff',
      red: '#d40412',
      teal: {
        300: '#31C4BF',
        500: '#218380',
        700: '#186360'
      },
      gray: {
        100: '#f5f5f5',
        300: '#D3D3D3',
        500: '#C0C0C0'
      },
    },
    extend: {
      fontFamily: {
        sans: 'Offside',
      }
    },
  },
  plugins: [],
}