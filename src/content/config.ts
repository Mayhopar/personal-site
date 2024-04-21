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
        preview1: z.string().optional(),
        preview2: z.string().optional(),
        preview3: z.string().optional(),
    })
}) 

export const collections = {
    works: worksCollection,
};