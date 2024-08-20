// Adapted from https://www.npmjs.com/package/@cloudcannon/remark-auto-import

import fg from "fast-glob";
import { join } from "path";
import {
  defaultImportSpecifier,
  importStatement,
  namedImportSpecifier,
} from "./tree-helper.js";
import { mySlugify } from "../src/assets/utils.ts";
import camelCase from "camelcase";

const baseDirectory = "src/assets";
const nameMatch = /(^|\/)(?<secondLast>[^.\/]+)\/(?<last>[^.\/]+)(\.[^\/]*)?$/;
const pattern = "*";
const additionals = [
  {
    importPath: "/src/components/ContentImage.astro",
    defaultImport: "ContentImage",
  },
  {
    importPath: "/src/components/ContentVideo.astro",
    defaultImport: "ContentVideo",
  }
];
const flatCollections = ["cubing-competition", "book-review"];

function autoImport(tree, file) {
  if (!file.history.find((name) => name.endsWith(".mdx"))) {
    return tree;
  }
  let filePathMatch = file.history[0].match(nameMatch);
  let seen = {};
  let contentCollection = filePathMatch.groups.secondLast;
  let contentDirectory;
  if (flatCollections.includes(contentCollection)) {
    contentDirectory = '';
  } else {
    contentDirectory =
      file.data.astro.frontmatter.url || mySlugify(filePathMatch.groups.last);
  }

  fg.sync(pattern, {
    cwd: join(
      process.cwd(),
      baseDirectory,
      contentCollection,
      contentDirectory
    ),
    absolute: true,
  }).forEach((path) => {
    let name = camelCase(path.match(nameMatch).groups.last);

    if (!name) {
      console.warn(path + ": Failed to get name, skipping file");
      return;
    }

    if (/^\d/.test(name)) {
      name = "_" + name;
    }

    if (seen[name]) {
      console.warn(
        `[remark-auto-import] ${file.history[0]}: Skipping import of ${path}: "${seen[name]}" already imported with name ${name}`
      );
      return;
    }

    seen[name] = path;

    tree.children.unshift(
      importStatement(path, [defaultImportSpecifier(name)])
    );
  });

  additionals?.forEach((additional) => {
    if (additional.tree) {
      tree.children.unshift(additional.tree);
    } else if (additional.importPath) {
      let specifiers = [];

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
  });

  return tree;
}

export default () => autoImport;
