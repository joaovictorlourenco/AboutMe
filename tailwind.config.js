/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'oklch(0.52 0.10 130)',
          light: 'oklch(0.62 0.12 130)',
          dark: 'oklch(0.40 0.08 130)',
          surface: 'oklch(0.94 0.03 130)',
        },
        accent: {
          DEFAULT: 'oklch(0.65 0.16 30)',
          light: 'oklch(0.78 0.12 30)',
        },
        ink: 'oklch(0.18 0.02 130)',
        muted: 'oklch(0.42 0.03 130)',
        surface: 'oklch(0.96 0.01 130)',
        border: 'oklch(0.88 0.02 130)',
      },
      fontFamily: {
        display: ['Bricolage', 'Sora', 'system-ui', 'sans-serif'],
        body: ['Sora', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}