import { decodeFilePath1, mySlugify } from "../lib/utils";
import rss from "@astrojs/rss";
import { getCollection, render } from "astro:content";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { getContainerRenderer as getMDXRenderer } from "@astrojs/mdx/container-renderer";
import { loadRenderers } from "astro:container";
import sanitizeHtml from "sanitize-html";

export async function GET(context: { site: URL }) {
  const renderers = await loadRenderers([getMDXRenderer()]);
  const container = await AstroContainer.create({ renderers });
  const publishedBlogs = (
    await getCollection("blog", ({ data: { pubDate } }) => pubDate)
  ).sort(
    (a, b) =>
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      new Date(b.data.pubDate!).getTime() - new Date(a.data.pubDate!).getTime(),
  );
  let items = [];
  for (let blog of publishedBlogs) {
    let { Content } = await render(blog);
    let content = sanitizeHtml(await container.renderToString(Content), {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat([
        "img",
        "picture",
        "source",
        "video",
        "details",
        "summary",
      ]),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        source: ["src", "srcset", "type", "media"],
        video: ["src", "width", "height", "poster", "controls"],
      },
      transformTags: {
        video: (tagName, attribs) => ({
          tagName,
          attribs: { ...attribs, controls: "" },
        }),
      },
      nonTextTags: ["script", "style", "textarea", "option", "xmp", "svg"],
    });
    let item = {
      title: decodeFilePath1(blog.filePath),
      content,
      pubDate: blog.data.pubDate,
      description: blog.data.description,
      link: `/blog/${blog.data.url || mySlugify(decodeFilePath1(blog.filePath))}/`,
    };
    items.push(item);
  }
  return rss({
    title: "Arhan's Blog",
    description: "A loose collection of technology and random thoughts",
    site: context.site,
    items,
  });
}
