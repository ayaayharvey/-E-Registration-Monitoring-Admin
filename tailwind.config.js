module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        "screen-10": "10vw",
        "screen-20": "20vw",
        "screen-30": "30vw",
        "screen-40": "40vw",
        "screen-50": "50vw",
        "screen-60": "60vw",
        "screen-70": "70vw",
        "screen-80": "80vw",
        "screen-90": "90vw",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
