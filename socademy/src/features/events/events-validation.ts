import { z } from "zod";

export const eventSchema = z.object({
    title: z.string().trim().min(1, "Tittel må fylles ut"),
    description: z.string().optional(),
    location: z.string().trim().optional(),
    startsAt: z.coerce.date(),
    endsAt: z.coerce.date().optional(),
});

export type CreateEventInput = z.infer<typeof eventSchema>;

