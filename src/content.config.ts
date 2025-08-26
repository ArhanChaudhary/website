import { z, defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";

const MDX_PATTERN = "**/*.mdx";

const blogCollection = defineCollection({
  loader: glob({ pattern: MDX_PATTERN, base: "src/content/blog" }),
  schema: z.object({
    url: z
      .string()
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      .optional(),
    pubDate: z.coerce.date().optional(),
    description: z.string().optional(),
    reddit: z.string().url().optional(),
    lobsters: z.string().url().optional(),
    hackernews: z.string().url().optional(),
  }),
});

const bookReviewCollection = defineCollection({
  loader: glob({ pattern: MDX_PATTERN, base: "src/content/book-review" }),
  schema: z.object({
    rating: z.number().gte(1).lte(5).multipleOf(0.5),
    read: z.coerce.date(),
    genre: z.string(),
    author: z.string(),
    url: z.string().url(),
  }),
});

export const writeupCategory = [
  "Web Exploitation",
  "Reverse Engineering",
  "Forensics",
  "General Skills",
  "Binary Exploitation",
] as const;

const ctfWriteupCollection = defineCollection({
  loader: glob({ pattern: MDX_PATTERN, base: "src/content/ctf-write-up" }),
  schema: z.object({
    description: z.string(),
    category: z.enum(writeupCategory),
    points: z.number(),
    attachments: z.array(z.string()).optional(),
    links: z
      .array(z.object({ name: z.string(), url: z.string().url() }))
      .optional(),
  }),
});

const ctfsCollection = defineCollection({
  loader: file("src/content/ctf-write-up/ctfs.json"),
  schema: z.object({
    id: z.string(),
    ctfLink: z.string().url(),
  }),
});

const cubingCompetitionCollection = defineCollection({
  loader: glob({
    pattern: MDX_PATTERN,
    base: "src/content/cubing-competition",
  }),
  schema: z.object({
    date: z.coerce.date(),
    slugOverride: z.string().optional(),
    results: z.array(
      z.object({
        round: z.union([
          z.literal("Semi-finals"),
          z.literal("Finals"),
          z.number(),
        ]),
        place: z.number().int(),
        times: z.array(z.union([z.literal("DNF"), z.number()])).length(5),
        plusTwos: z.array(z.number().int()).max(5).optional(),
      })
    ),
  }),
});

const projectCollection = defineCollection({
  loader: glob({ pattern: MDX_PATTERN, base: "src/content/project" }),
  schema: z.object({
    sideProject: z.boolean(),
    link: z.string().url().optional(),
    dateRange: z.string(),
  }),
});

const unreadBooksCollection = defineCollection({
  loader: file("src/content/book-review/unread-books.json"),
  schema: z.object({
    id: z.string(),
    genre: z.string(),
    author: z.string(),
    url: z.string().url(),
    inProgress: z.boolean(),
  }),
});

export const collections = {
  blog: blogCollection,
  "book-review": bookReviewCollection,
  "ctf-write-up": ctfWriteupCollection,
  ctfs: ctfsCollection,
  "cubing-competition": cubingCompetitionCollection,
  project: projectCollection,
  "unread-books": unreadBooksCollection,
};
