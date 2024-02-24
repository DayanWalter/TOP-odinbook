/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        success: '#54C130',
        info: '#7488FC',
        warning: '#FFA100',
        danger: '#FF5444',
      },
    },
  },
  plugins: [],
};
