import { decodeFilePath1, mySlugify } from "../assets/utils.ts";
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context: { site: URL }) {
  const publishedBlogs = (
    await getCollection("blog", ({ data: { pubDate } }) => pubDate)
  ).sort(
    (a, b) =>
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      new Date(b.data.pubDate!).getTime() - new Date(a.data.pubDate!).getTime()
  );
  return rss({
    title: "Arhan's Blog",
    description: "Arhan's personal website",
    site: context.site,
    items: publishedBlogs.map((blog) => ({
      title: decodeFilePath1(blog.filePath),
      pubDate: blog.data.pubDate,
      description: blog.data.description,
      link: `/blog/${blog.data.url || mySlugify(decodeFilePath1(blog.filePath))}/`,
    })),
  });
}
