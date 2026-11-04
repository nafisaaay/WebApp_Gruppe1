import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().trim().min(1, "Tittel må fylles ut"),
  description: z.string().trim().optional(),
  location: z.string().trim().optional(),
  category: z.enum(["social", "study", "sports", "other"]),
  isOutdoor: z.boolean().default(false),
  startsAt: z.coerce.date(),
  endsAt: z.coerce.date().optional(),
});

export type CreateEventInput = z.infer<typeof eventSchema>;
