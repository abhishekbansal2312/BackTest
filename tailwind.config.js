/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1E90FF",
        secondary: "#32CD32",
        dark: "#1E1E1E",
        light: "#F8F8F8",
        accent: "#FF4500",
        profit: "#32CD32",
        loss: "#FF4500",
      },
    },
  },
  plugins: [],
};
