import { defineCollection, z } from "astro:content";

const worksCollection = defineCollection({
    schema: ({ image }) => z.object({
        featured: z.boolean().default(false),
        image: image(),
        title: z.string(),
        year: z.string(),
        role: z.string(),
        description: z.string().optional(),
        date: z.date(),
        preview1: z.string(),
        preview2: z.string(),
        preview3: z.string(),
    })
}) 

export const collections = {
    works: worksCollection,
};