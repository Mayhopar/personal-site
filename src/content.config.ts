import { glob } from 'astro/loaders';
import { defineCollection, z } from "astro:content";

const worksCollection = defineCollection({ loader: glob({ pattern: '**/[^_]*.{md,mdx,markdown}', base: './src/content/works' }),
    schema: ({ image }) => z.object({
        featured: z.boolean().default(false),
        image: image(),
        title: z.string(),
        year: z.string(),
        role: z.string(),
        description: z.string().optional(),
        date: z.date(),
        link: z.string().optional(),
        preview1: z.string(),
        preview2: z.string(),
        preview3: z.string(),
    })
}) 

export const collections = {
    works: worksCollection,
 blog: defineCollection({ loader: glob({ pattern: '**/[^_]*.{md,mdx,markdown}', base: './src/content/blog' }) })};