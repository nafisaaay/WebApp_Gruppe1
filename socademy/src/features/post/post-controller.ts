import { BaseController } from "../base-controller";
import { postService, PostService } from "./post-scervice";
import { RequestInfo } from "rwsdk/worker";
import { parseParams } from "./utils/parse-params";
import { demoDelay, demoFailure } from "@/lib/demo-chaos";

export interface PostController extends BaseController{
    

}

export function createPostController (_service : PostService): PostController{
    return {
        async getAll({request, ctx} : RequestInfo ){
         const params = parseParams(request);
         const result = await _service.getAll(params)
         
         if(!result.ok) {return Response.json({
            ok: false,
            error: result.error
         },
        {
            status: Number(result.error.code),
        })
        }
        return Response.json(
            {
                ok:true,
                data: result.data
            },
            {
                status: 200,
            }
        )
    },
    async create({request, ctx}: RequestInfo ){
        let body: unknown;
        try{
            body = await request.json();
        }
        catch{
            return Response.json(
                {
                    ok:false, 
                    error:{
                        code: 400,
                        message: "body must be JSON",
                        fieldErrors: {}
                    },
                },
                {status: 400}
            )
        };
        const TEMP_USER_ID = "1";
         const result = await _service.create(body, TEMP_USER_ID);
        return result.ok 
        ? Response.json(result, {
            status: 201,
        })
        : Response.json(result, {
            status: Number(result.error.code),
        });
       
    },
   async get({params}: RequestInfo){ 
    const result = await _service.get(params.id);
    return result.ok
    ? Response.json(result, {
        status: 200
    }) 
    : Response.json(result, {
        status: Number(result.error.code),
    }) 
   },
   async remove({ request, params, ctx} : RequestInfo) {
        await demoDelay(request, 1000);
        const chaos = demoFailure(request);
        if(chaos){
            return Response.json(
                {
                    ok:false, 
                    error: chaos
                },
                {
                    status: 500
                }
            );
        }
        const TEMP_USER_ID = "1";
        const result = await _service.remove(params.id,TEMP_USER_ID)

        return result.ok ? new Response(null, {
            status: 204
        })
        : Response.json(result, {
            status: Number(result.error.code)
        })
    },

    async update({request, params}: RequestInfo) {
        let body: unknown;
        try{
            body = await request.json();
        }
        catch{
            return Response.json({
                ok: false, 
                error: {
                    code: 400,
                    message: "body must be JSON",
                    fieldErrors: {}
                }
            },
        {
            status: 400
        })
        };
        const TEMP_USER_ID = "1";
        const result = await _service.update(params.id, body,TEMP_USER_ID)

        return result.ok 
        ? Response.json(result, {
            status: 200,
        })
        : Response.json(result, {
            status: Number(result.error.code),
        })
    },
 
}
    
    
}
export const postController = createPostController(postService);