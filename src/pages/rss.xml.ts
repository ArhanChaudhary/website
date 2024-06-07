import { decodeFileName, mySlugify } from "../assets/utils.ts";
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context: { site: URL }) {
  const publishedBlogs = await getCollection(
    "blog",
    ({ data: { pubDate } }) => pubDate
  );
  return rss({
    title: "Arhan's Blog",
    description: "Arhan's personal website",
    site: context.site,
    items: publishedBlogs.map((post) => ({
      title: decodeFileName(post.id),
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${mySlugify(decodeFileName(post.id))}/`,
    })),
  });
}
