import { z } from 'zod';
import { loginSchema } from './utils/loginSchema';

export type LoginInput = z.infer<typeof loginSchema>;

export interface LOGIN {
    email: string;
    password: string;
}

export interface USER {
    id: string;
    email: string;
}

export interface LOGINRESULT {
    user: USER;
    headers?: Headers;
}