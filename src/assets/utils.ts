import slugify from "slugify";

export function mySlugify(str: string) {
  return str
    .split("/")
    .map((val) => slugify(val, { lower: true, strict: true }))
    .join("/");
}

export function decodeFileName(str: string, replaceMDX = true) {
  if (replaceMDX) {
    return decodeURIComponent(str.replace(".mdx", ""));
  }
  return decodeURIComponent(str);
}
