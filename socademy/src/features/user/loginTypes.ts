import { z } from 'zod';
import { loginSchema } from './utils/loginSchema';

export type LoginInput = z.infer<typeof loginSchema>;

export interface LOGIN {
    email: string;
    password: string;
}
