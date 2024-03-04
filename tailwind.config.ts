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
    extend: {
      animation: {
        sliding: "sliding 30s linear infinite",
      },
      colors: {
        ice: "#F0F0EE",
        dark: "#3C3C3B",
        "light-gray-200": "#E2E2E2",
        "light-gray": "#D2D2D2",
        green: "#8CBF3C",
        gold: "#916F4A",
        brand: {
          "primary": "rgb(228, 0, 63)",
          "gradient":
            "linear-gradient(90deg, rgba(228, 0, 63, 1) 35%, rgba(233, 83, 14, 1) 70%)",
        },
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
