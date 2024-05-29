import { z, defineCollection } from "astro:content";

const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    pubDate: z.date().optional(),
    description: z.string(),
  }),
});

export const writeupCategory = [
  "Web Exploitation",
  "Reverse Engineering",
  "Forensics",
  "General Skills",
  "Binary Exploitation",
] as const;

const CTFWriteupCollection = defineCollection({
  type: "content",
  schema: z.object({
    description: z.string(),
    category: z.enum(writeupCategory),
    points: z.number(),
    attachments: z.array(z.string()).optional(),
    links: z
      .array(
        z.object({
          name: z.string(),
          url: z.string().url(),
        })
      )
      .optional(),
  }),
});

const bookReviewCollection = defineCollection({
  type: "content",
  schema: z.object({
    rating: z.number().gte(1).lte(5).multipleOf(0.5),
    read: z.date(),
  }),
});

const ctfsCollection = defineCollection({
  type: "data",
  schema: z.array(
    z.object({
      ctfName: z.string(),
      ctfLink: z.string().url(),
    })
  ),
});

const unreadBooksCollection = defineCollection({
  type: "data",
  schema: z.array(
    z.object({
      title: z.string(),
      author: z.string(),
      url: z.string().url(),
      inProgress: z.boolean(),
    })
  ),
});

export const collections = {
  blog: blogCollection,
  "ctf-write-up": CTFWriteupCollection,
  "book-review": bookReviewCollection,
  ctfs: ctfsCollection,
  "unread-books": unreadBooksCollection,
};
