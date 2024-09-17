/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        "background": "#252525",
        "button-instagram": "#DD2A7B",
        "button-linkedin": "#0068BE",
        "button-github": "#000000",
        "gmail": "#E13A3A",
      }
    },
  },
  plugins: [],
}

