import z from "zod";

// ------------------------------------- tour zod validation -------------------------------------
export const tourZodSchemaToCreate = z.object({
    title: z.string(),
    slug: z.string().optional(),
    images: z.string().optional(),
    description: z.string().optional(),
    location: z.string().optional(),
    costForm: z.number().optional(),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    included: z.array(z.string()).optional(),
    excluded: z.array(z.string()).optional(),
    amenites: z.array(z.string()).optional(),
    tourPlan: z.string().optional(),
    maxGuests: z.number().optional(),
    minAge: z.number().optional(),
    division: z.string(),
    tourType: z.string()

})

export const tourZodSchemaToUpdate = z.object({
    title: z.string().optional(),
    slug: z.string().optional(),
    images: z.string().optional(),
    description: z.string().optional(),
    location: z.string().optional(),
    costForm: z.number(),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    included: z.array(z.string()).optional(),
    excluded: z.array(z.string()).optional(),
    amenites: z.array(z.string()).optional(),
    tourPlan: z.string().optional(),
    maxGuests: z.number().optional(),
    minAge: z.number().optional(),
    division: z.string().optional(),
    tourType: z.string().optional()
})

// ------------------------------------- tour type zod schema -------------------------------------
export const tourTypeZodSchema = z.object({
  name: z.string()
})