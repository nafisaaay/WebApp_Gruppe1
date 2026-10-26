import type { Params } from "./parse-params";

export type PostListParams = {
    q?: string; 
    limit?: number;
}

export type ListParamValidation = 
|{
    ok: true;
    params: PostListParams;
}
|
{
    ok: false;
    field: keyof PostListParams;
    error: string;
}

export const LIST_LIMIT_MAX = 100;

export function validatePostParams(input : Params): ListParamValidation{
    const params : PostListParams = {}

    const search = input.q?.trim();

     if (search) params.q = search;

    if(input.limit){
        const limit = Number(input.limit);

        const isValidLimit = 
        Number.isInteger(limit) && limit >= 1 && limit <= LIST_LIMIT_MAX;

        if(!isValidLimit){
            return{
                ok: false,
                field:"limit",
                error: `limit has to be between 1 and ${LIST_LIMIT_MAX}`
            }
        }
        params.limit = limit;
    }
    return {ok: true, params}

}