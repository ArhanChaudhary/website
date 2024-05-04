import { defineConfig } from 'astro/config';
import robotsTxt from "astro-robots-txt";
import sitemap from "@astrojs/sitemap";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: 'https://arhan.sh',
  integrations: [robotsTxt(), sitemap(), mdx()]
});