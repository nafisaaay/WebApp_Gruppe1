import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().nonempty("Email er påkrevd."),
    password: z.string().nonempty("Passord er påkrevd.")
});

