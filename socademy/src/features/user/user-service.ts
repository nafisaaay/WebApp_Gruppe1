import { db } from '@/db';
import { z } from 'zod';
import { auth } from "../auth/auth";
import type { BaseService } from "../base-service";
import { Errors } from "../results";
import type { USER } from "./loginTypes";
import { loginSchema } from "./utils/loginSchema";
import { createUserRepository } from './user-repository';

const userRepository = createUserRepository(db);

export interface UserService extends BaseService<USER, never>{}

export const userService: UserService = {
    /*
    create: async (input) => {
        const parsed = loginSchema.safeParse(input);
        if(!parsed.success){
            return { 
                ok: false, 
                error: { ...Errors.badRequest, fieldErrors: z.flattenError(parsed.error).fieldErrors },
            };
        }

        try {
            const { headers, response } = await loginAuth.api.signInEmail({
                body: parsed.data,
                returnHeaders: true,
            });
            return {
                ok: true,
                data: { user: {id: response.user.id, email: response.user.email }, headers },
            };
        } catch {
            return {ok: false, error: {...Errors.unauthorized, message: "Feil e-post eller passord."}}
        }
    },
    */

    get: async (id, userId) => {
        if(!userId) return { ok: false, error: Errors.unauthorized };
        if(userId !== id ) return { ok: false, error: Errors.forbidden };

        const res = await  userRepository.get(id);
        if(!res.ok) return res;
        if(!res.data) return {ok: false, error: Errors.notFound };

        return { ok: true, data: res.data};
    },

    create: async () => ({ ok: false, error: Errors.notSupported }),
    getAll: async () => ({ ok: false, error: Errors.notSupported }),
    remove: async () => ({ ok: false, error: Errors.notSupported })       
}


/*
Controller leser forespørselen og kaller service, som validerer med loginSchema. 
Repository er klart til bruk når man trenger å hente en bruker fra databasen.
*/