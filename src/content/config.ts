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

const writeupCollection = defineCollection({
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

const readingCollection = defineCollection({
  type: "content",
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

export const collections = {
  blog: blogCollection,
  "write-up": writeupCollection,
  reading: readingCollection,
  ctfs: ctfsCollection,
};
