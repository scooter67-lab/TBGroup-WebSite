/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        admin: {
          sidebar: '#0B1F3A',
          accent: '#2D9CDB',
        },
      },
    },
  },
  plugins: [],
};
