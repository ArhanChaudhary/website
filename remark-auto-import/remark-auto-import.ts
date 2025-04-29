// Adapted from https://www.npmjs.com/package/@cloudcannon/remark-auto-import

import fg from "fast-glob";
import { join } from "node:path";
import {
  defaultImportSpecifier,
  importStatement,
  namedImportSpecifier,
} from "./tree-helper.js";
import camelCase from "camelcase";

const baseDirectory = "src/assets";
const pattern = "*";
const additionals = new Array<{
  importPath: string;
  defaultImport?: string;
  namedImports?: { name: string; alias?: string }[];
}>(
  {
    importPath: "/src/components/ContentImage.astro",
    defaultImport: "ContentImage",
  },
  {
    importPath: "/src/components/ContentVideo.astro",
    defaultImport: "ContentVideo",
  }
);
const flatCollections = ["cubing-competition", "book-review", "ctf-write-up"];

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function autoImport(tree: any, file: { history: string[] }) {
  if (!file.history.find((name: string) => name.endsWith(".mdx"))) {
    return tree;
  }
  let contentIndex = file.history[0].lastIndexOf("/src/") + 1;
  contentIndex = file.history[0].indexOf("/", contentIndex) + 1;
  contentIndex = file.history[0].indexOf("/", contentIndex) + 1;

  const contentCollection = file.history[0].slice(contentIndex).split("/");
  let contentDirectory: string | undefined;
  if (flatCollections.includes(contentCollection[0])) {
    contentCollection.pop();
    contentDirectory = contentCollection.pop();
  } else {
    contentDirectory = contentCollection.pop()?.replace(".mdx", "");
  }
  if (!contentDirectory) {
    throw new Error("Failed to get content directory");
  }

  const seen: { [key: string]: string } = {};
  for (const path of fg.sync(pattern, {
    cwd: join(
      process.cwd(),
      baseDirectory,
      ...contentCollection,
      contentDirectory
    ),
    absolute: true,
  })) {
    let name = path.replace(".mdx", "").split("/").at(-1)?.split(".")[0];
    if (!name) {
      throw new Error("Failed to get name");
    }
    name = camelCase(name);

    if (!name) {
      console.warn(`${path}: Failed to get name, skipping file`);
      continue;
    }

    if (/^\d/.test(name)) {
      name = `_${name}`;
    }

    if (seen[name]) {
      console.warn(
        `[remark-auto-import] ${file.history[0]}: Skipping import of ${path}: "${seen[name]}" already imported with name ${name}`
      );
      continue;
    }

    seen[name] = path;

    console.log("H: ", name);
    tree.children.unshift(
      importStatement(path, [defaultImportSpecifier(name)])
    );
  }

  for (const additional of additionals) {
    const specifiers = [];
    if (additional.defaultImport) {
      specifiers.push(defaultImportSpecifier(additional.defaultImport));
    }

    if (additional.namedImports) {
      specifiers.push(
        ...additional.namedImports.map(({ name, alias }) =>
          namedImportSpecifier(name, alias)
        )
      );
    }

    tree.children.unshift(importStatement(additional.importPath, specifiers));
  }

  return tree;
}

export default () => autoImport;
