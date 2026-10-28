import { db } from '@/db';
import type { BaseService } from "../../shared/base-service";
import { Errors } from "../../shared/results";
import type { USER } from "./loginTypes";
import { createUserRepository } from './user-repository';

const userRepository = createUserRepository(db);

export interface UserService extends BaseService<USER, never>{}

export const userService: UserService = {

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
    remove: async () => ({ ok: false, error: Errors.notSupported }),
    update: async () => ({ ok: false, error: Errors.notSupported })      
}


/*
Controller leser forespørselen og kaller service, som validerer med loginSchema. 
Repository er klart til bruk når man trenger å hente en bruker fra databasen.
*/