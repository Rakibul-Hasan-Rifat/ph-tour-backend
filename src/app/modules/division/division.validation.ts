import z from "zod";

export const divisionZodSchemaToCreate = z.object({
    name: z.string().min(2),
    slug: z.string().optional(),
    thumbnail: z.string().optional(),
    description: z.string().optional(),
})

export const divisionZodSchemaToUpdate = z.object({
    name: z.string().min(2).optional(),
    slug: z.string().optional(),
    thumbnail: z.string().optional(),
    description: z.string().optional()
})