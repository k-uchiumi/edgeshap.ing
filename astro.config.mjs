import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://edgeshap.ing',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [sitemap()]
});