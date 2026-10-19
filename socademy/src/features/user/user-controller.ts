import type { BaseController } from "../base-controller";
import type { LoginInput } from "./loginTypes";
import { userService } from "./user-service";
import { Errors } from "../results";

export interface UserController extends BaseController {}

export const userController: UserController = {
    async create(requestInfo) {
        let input: LoginInput;
        try {
            input = await requestInfo.request.json();
        } catch {
            return Response.json({ error: Errors.badRequest}, {status: Errors.badRequest.code });
        }
        const result = await userService.create(input, "");
        
        if(!result.ok) {
            return Response.json({ error: result.error }, {status: result.error.code });
        }
        return Response.json({ data: result.data.user }, { status: 200, headers: result.data.headers });
    },

    async get(requestInfo) { 
        const { userId } = requestInfo.ctx.session;

        if (!userId) {
            return Response.json({ error: Errors.unauthorized }, {status: Errors.unauthorized.code })
        }

        const result = await userService.get(userId, userId);
        if(!result.ok) {
            return Response.json({ error: result.error }, {status: result.error.code});
        }
        return Response.json({ data: result.data.user }, { status: 200 });
    },
    
    
    async getAll() { return Response.json({ error: Errors.notSupported}, {status: Errors.notSupported.code }) },
    async update() { return Response.json({ error: Errors.notSupported}, {status: Errors.notSupported.code }) },
    async remove() { return Response.json({ error: Errors.notSupported}, {status: Errors.notSupported.code }) },
}; 

/*
Controller leser forespørselen og kaller service, som validerer med loginSchema. 
Repository er klart til bruk når man trenger å hente en bruker fra databasen.
*/