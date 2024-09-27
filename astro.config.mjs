// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  prefetch: true,
  site: 'https://joaovictorlourenco.github.io/AboutMe/',
  integrations: [tailwind(), icon(), sitemap()],
});