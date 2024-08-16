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
    items: publishedBlogs.map((blog) => ({
      title: decodeFileName(blog.id),
      pubDate: blog.data.pubDate,
      description: blog.data.description,
      link: `/blog/${blog.data.url || mySlugify(decodeFileName(blog.id))}/`,
    })),
  });
}
