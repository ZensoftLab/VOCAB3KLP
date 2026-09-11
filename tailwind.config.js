/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        soft: "0 18px 50px rgba(6, 15, 35, 0.25)",
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(circle at top, rgba(255, 212, 111, 0.18), transparent 36%), radial-gradient(circle at 20% 25%, rgba(75, 107, 255, 0.16), transparent 26%), linear-gradient(180deg, #0a1020 0%, #091222 100%)",
      },
    },
  },
  plugins: [],
};
