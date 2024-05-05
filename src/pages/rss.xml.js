import rss, { pagesGlobToRssItems } from "@astrojs/rss";

export async function GET(context) {
  return rss({
    title: "Arhan's Blog",
    description: "Arhan's personal website",
    site: context.site,
    items: await pagesGlobToRssItems(import.meta.glob("./blog/*.mdx")),
  });
}
