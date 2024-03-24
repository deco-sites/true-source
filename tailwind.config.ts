import daisyui, { Config } from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: {
    container: {
      center: true,
      screens: {},
    },
    colors: {
      "terra-clara": "#F0E9E9",
      ice: "#F0F0EE",
      dark: "#3C3C3B",
      white: "#fff",
      black: "#000",
      "light-gray-200": "#E2E2E2",
      "light-gray": "#D2D2D2",
      gray: "#8E8E8D",
      green: "#8CBF3C",
      "dark-green": "#294B14",
      gold: "#916F4A",
      orange: "#E9530E",
      red: "#e4003f",
      transparent: "transparent",
      Stroke: "#EDEDED",
    },
    extend: {
      animation: {
        sliding: "sliding 30s linear infinite",
      },
      keyframes: {
        sliding: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      fontFamily: {
        lemon: ["Lemon Milk"],
        inter: ["Inter"],
      },
    },
  },
} as Config;
