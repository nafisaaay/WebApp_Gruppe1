import { fail, type BaseController } from "../base-controller";
import { userService } from "./user-service";
import { Errors } from "../results";

export interface UserController extends BaseController {}

export const userController: UserController = {

    async create() { return fail(Errors.notSupported); },

    // GET /api/users/me: henter innlogget bruker
    async get(requestInfo) { 
        const { userId } = requestInfo.ctx.session;

        if (!userId) return fail(Errors.unauthorized);

        const result = await userService.get(userId, userId);
        return result.ok
            ? Response.json(result, { status: 200})
            : Response.json(result, { status: result.error.code });
    },
    
    
    async getAll() { return fail(Errors.notSupported);},
    async update() { return fail(Errors.notSupported);},
    async remove() { return fail(Errors.notSupported);},
}; 

/*
Controller leser forespørselen og kaller service. 
Service sjekker tilgang (401/403/404). 
Repository er det eneste laget som snakker med databasen.
Registrering og innlogging håndteres av Better Auth på /api/auth/*.
*/