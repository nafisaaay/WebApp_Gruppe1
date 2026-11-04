import { z } from 'zod';
import { loginSchema } from './utils/loginSchema';


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

// Interface for profilsiden til senere bruk:
export interface UserProfile {
    studentNr: string; //bruker studentnr som ID også.
    name: string;
    birthDate: Date;
    studiested: string;
    rolle: string;
}