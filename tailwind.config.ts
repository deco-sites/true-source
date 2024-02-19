import daisyui from "daisyui";

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
      ice: "#F0F0EE",
      dark: "#3C3C3B",
      white: "#fff",
      "light-gray-200": "#E2E2E2",
      "light-gray": "#D2D2D2",
      gray: "#8E8E8D",
      green: "#8CBF3C",
      "dark-green": "#294B14",
      gold: "#916F4A",
      red: "#e4003f",
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
    },
  },
};
