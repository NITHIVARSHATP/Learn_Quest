/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: {
      extend: {
        colors: {
          primary: "#0ea5e9",      // Sky blue
          accent: "#a855f7",       // Violet
          bgDark: "#0f172a",       // Dark background
          card: "#1e293b",         // Card background
        },
      },
    },
    plugins: [],
  };
  