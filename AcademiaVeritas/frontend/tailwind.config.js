/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0A74DA",    // Blue
        secondary: "#18A959",  // Green
        accent: "#D93025",     // Red
        dark: "#202124",       // Charcoal
        light: "#F8F9FA",      // Light BG
        card: "#FFFFFF",       // Card White
      },
      fontFamily: {
        heading: ["Inter", "Poppins", "sans-serif"],
        body: ["Roboto", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}