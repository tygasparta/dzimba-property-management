/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'zim-green': {
          DEFAULT: '#009B4E',
          50: '#E6F7EF',
          100: '#CCEFDF',
          200: '#99DFC0',
          300: '#66CFA0',
          400: '#33BF81',
          500: '#009B4E',
          600: '#007C3E',
          700: '#005C2F',
          800: '#003D1F',
          900: '#001D10'
        },
        'zim-yellow': {
          DEFAULT: '#FFD200',
          50: '#FFF9E6',
          100: '#FFF4CC',
          200: '#FFE999',
          300: '#FFDF66',
          400: '#FFD833',
          500: '#FFD200',
          600: '#CCA800',
          700: '#997E00',
          800: '#665400',
          900: '#332A00'
        },
        'zim-red': {
          DEFAULT: '#EF3340',
          50: '#FDEBEC',
          100: '#FBD7D9',
          200: '#F7AFB3',
          300: '#F4878D',
          400: '#F05F67',
          500: '#EF3340',
          600: '#BF2933',
          700: '#8F1F26',
          800: '#5F141A',
          900: '#300A0D'
        },
        'zim-black': {
          DEFAULT: '#000000',
          50: '#F2F2F2',
          100: '#E6E6E6',
          200: '#CCCCCC',
          300: '#B3B3B3',
          400: '#999999',
          500: '#808080',
          600: '#666666',
          700: '#4D4D4D',
          800: '#333333',
          900: '#1A1A1A'
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'gradient-xy': 'gradient-xy 3s ease infinite',
      },
      keyframes: {
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      },
    },
  },
  plugins: [],
};