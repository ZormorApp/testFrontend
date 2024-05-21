/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        "chrome-yellow": "#FFA500",
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        "md": "2rem",
        "lg": "4rem"
      },
    },
  },
  plugins: [],
}
