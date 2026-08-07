import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://edgeshap.ing',
  trailingSlash: 'never',
  build: { format: 'file' }
});
