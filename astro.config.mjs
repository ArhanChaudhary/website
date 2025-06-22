import { defineConfig } from "astro/config";
import remarkToc from "remark-toc";
import robotsTxt from "astro-robots-txt";
import sitemap from "@astrojs/sitemap";
import remarkAutoImport from "./remark-auto-import/remark-auto-import.ts";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://arhan.sh",
  integrations: [robotsTxt(), sitemap(), mdx()],
  markdown: {
    remarkPlugins: [remarkToc, remarkAutoImport],
    shikiConfig: {
      theme: "catppuccin-macchiato",
    },
  },
  experimental: {
    fonts: [
      {
        provider: "local",
        name: "Input Mono",
        cssVariable: "--font-input-mono",
        fallbacks: ["Helvetica"],
        variants: [
          {
            weight: 200,
            style: "normal",
            src: ["./src/assets/fonts/InputMono/InputMono-ExtraLight.woff2"],
          },
          {
            weight: "normal",
            style: "normal",
            src: ["./src/assets/fonts/InputMono/InputMono-Regular.woff2"],
          },
          {
            weight: 500,
            style: "normal",
            src: ["./src/assets/fonts/InputMono/InputMono-Medium.woff2"],
          },
          {
            weight: "bold",
            style: "normal",
            src: ["./src/assets/fonts/InputMono/InputMono-Bold.woff2"],
          },
        ],
      },
    ],
  },
});
