import { decode } from "html-entities";
import slugify from "slugify";

export function mySlugify(str: string) {
  return str
    .split("/")
    .map((val) =>
      slugify(val, { lower: true, strict: true })
    )
    .join("/");
}

export function decodeFileName(str: string | undefined, replaceMDX = true) {
  if (!str) {
    throw new Error("File name is undefined");
  }
  if (replaceMDX) {
    return decode(str.replace(".mdx", ""));
  }
  return decode(str);
}

export function decodeFilePath1(str: string | undefined, replaceMDX = true) {
  const fileName = str?.split("/").pop();
  if (!fileName) {
    throw new Error("File name is undefined");
  }
  return decodeFileName(fileName, replaceMDX);
}

export function decodeFilePath2(str: string | undefined) {
  const fileName = str?.split("/").at(-2);
  if (!fileName) {
    throw new Error("File name is undefined");
  }
  return decode(fileName);
}
