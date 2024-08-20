import { defineConfig } from "astro/config";
import remarkToc from "remark-toc";
import robotsTxt from "astro-robots-txt";
import sitemap from "@astrojs/sitemap";
import remarkAutoImport from "./remark-auto-import/remark-auto-import.js";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://arhan.sh",
  integrations: [robotsTxt(), sitemap(), mdx()],
  markdown: {
    remarkPlugins: [remarkToc, remarkAutoImport],
    shikiConfig: {
      theme: "one-dark-pro",
    },
  },
});
