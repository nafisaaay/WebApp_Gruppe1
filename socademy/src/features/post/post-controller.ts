import { BaseController } from "@/shared/base-controller";
import { postService, PostService } from "./post-service";
import { RequestInfo } from "rwsdk/worker";
import { parseParams } from "./utils/parse-params";

export interface PostController extends BaseController {}
const parseId = (value: string | undefined): number | null => {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
};

const invalidIdResponse = () =>
  Response.json(
    {
      ok: false,
      error: { code: 400, message: "invalid id", fieldErrors: {} },
    },
    { status: 400 },
  );


const unauthorizedResponse = () =>
  Response.json(
    {
      ok: false,
      error: { code: 401, message: "you must be logged in", fieldErrors: {} },
    },
    { status: 401 },
  );


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
        const userId = ctx.session.userId;
        if (!userId) return unauthorizedResponse();
        
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
        const result = await _service.create(body, userId);
        return result.ok 
        ? Response.json(result, {
            status: 201,
        })
        : Response.json(result, {
            status: Number(result.error.code),
        });
       
    },

   async get({params}: RequestInfo){ 
    const id = parseId(params.id);
    if (id === null) return invalidIdResponse();
    const result = await _service.get(id);
    return result.ok
    ? Response.json(result, {
        status: 200
    }) 
    : Response.json(result, {
        status: Number(result.error.code),
    }) 
   },
   async remove({ params, ctx }: RequestInfo) {
        const userId = ctx.session.userId;
        if (!userId) return unauthorizedResponse();

        const id = parseId(params.id);
        if (id === null) return invalidIdResponse();

        const result = await _service.remove(id, userId);

        return result.ok
        ? new Response(null, { status: 204 })
        : Response.json(result, { status: Number(result.error.code) });
    },

    async update({request, params, ctx}: RequestInfo) {
        const userId = ctx.session.userId;
        if (!userId) return unauthorizedResponse();
        
        
        const id = parseId(params.id);
        if (id === null) return invalidIdResponse();
        
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

        const result = await _service.update(id, body,userId)

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