import { defineConfig } from "astro/config";
import remarkToc from "remark-toc";
import robotsTxt from "astro-robots-txt";
import sitemap from "@astrojs/sitemap";
import remarkAutoImport from "./remark-auto-import/remark-auto-import.ts";
import { transformerNotationDiff } from "@shikijs/transformers";
import mdx from "@astrojs/mdx";
import { typst } from "astro-typst";

// https://astro.build/config
export default defineConfig({
  site: "https://arhan.sh",
  integrations: [
    robotsTxt(),
    sitemap(),
    mdx({
      remarkPlugins: [remarkToc, remarkAutoImport],
      shikiConfig: {
        transformers: [
          transformerNotationDiff({
            matchAlgorithm: "v3",
          }),
        ],
        theme: "catppuccin-mocha",
        // theme: "tokyo-night",
        // theme: "material-theme-ocean",
        // theme: "kanagawa-wave",
        // theme: "plastic",
        // theme: "one-dark-pro",
      },
      remarkRehype: {
        clobberPrefix: "",
      },
    }),
    typst({
      options: {
        remPx: 14,
      },
      target: () => "svg",
    }),
  ],
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
