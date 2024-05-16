import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context: { site: URL }) {
  const publishedBlogs = await getCollection("blog", ({ data }) => data.pubDate);
  return rss({
    title: "Arhan's Blog",
    description: "Arhan's personal website",
    site: context.site,
    items: publishedBlogs.map((post) => ({
      title: post.id.replace(".mdx", ""),
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.slug}/`,
    })),
  });
}
