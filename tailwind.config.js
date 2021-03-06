module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tblue: "#1d9bf0",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
