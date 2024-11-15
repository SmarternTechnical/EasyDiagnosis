/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        'baloo-bhaijaan': ['Baloo Bhaijaan', 'sans-serif'],
      },
      boxShadow: {
        'custom': '-3px 3px 11.7px -1px rgba(0, 0, 0, 0.29)',
      },
      borderWidth: {
        'custom': '0.8px',
      },
      colors: {
        'custom-border': '#1FAB89',
      },
      
    },
    
  },
  plugins: [],
}