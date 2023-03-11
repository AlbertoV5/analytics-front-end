import { z, defineCollection } from "astro:content"

const metrics = defineCollection({
    schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string(),
    })
});

const tableauData = z.object({
    name: z.string(),
    width: z.optional(z.string()),
    height: z.optional(z.string()),
})

const reports = defineCollection({
    schema: z.object({
        title: z.string(),
        description: z.string(),
        author: z.string(),
        date: z.string(),
        workbook: z.string(),
        dashboard: tableauData,
        sheets: z.array(tableauData)
    })
})

export const collections = { metrics, reports };
