import type { BaseRepository } from "../../shared/base-repository";
import type { DB } from "@/db";
import type { USER } from "./login-types";
import { User, user } from "@/db/schema/schema";
import { eq } from "drizzle-orm";
import { Errors } from "../../shared/results";

export interface UserRepository extends BaseRepository<USER, never, never, string>{}

export function createUserRepository(_db : DB): UserRepository{
    return {
        get: async (id) => {
            try {
                const [row] = await _db
                    .select({ id: user.id, email: user.email })
                    .from(user)
                    .where(eq(user.id, id.toString()))
                    .limit(1);
                return { ok: true, data: row ?? null };
            } catch {
                return { ok: false, error: { ...Errors.server, message: "Kunne ikke hente bruker." }};  
            }
        },

        getAll: async() => ({ ok: false, error: Errors.notSupported }),
        create: async() => ({ ok: false, error: Errors.notSupported }),
        remove: async() => ({ ok: false, error: Errors.notSupported }),
        update:async() => ({ ok: false, error: Errors.notSupported }),
    };
} 


/*
Controller leser forespørselen og kaller service, som validerer med loginSchema. 
Repository er klart til bruk når man trenger å hente en bruker fra databasen.
*/