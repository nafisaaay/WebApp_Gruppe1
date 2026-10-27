import { PostDTO } from "./post-mapper"
import { AppError } from "../../shared/results"

type GetAllPostResult =
  | { ok: true; data: PostDTO[] }
  | { ok: false; error: AppError };


type PostResult = 
    | {ok: true; data: PostDTO}

    | {ok:false, 
        error: AppError};

type RemovePostResult =
  | { ok: true; data: { id: number } }
  | { ok: false; error: AppError };



export async function getAllPosts(params: Record<string, string> = {}): Promise<GetAllPostResult> {
  const query = new URLSearchParams(params).toString();
  try {
    const response = await fetch(`/api/v1/posts?${query}`);
    return (await response.json()) as GetAllPostResult;
  } catch (error) {
    console.error(error);

    return {
      ok: false,
      error: {
        code: 500,
        message: "could not contact server, or theres something wrong with the query",
        fieldErrors: {},
      },
    };
  }
}

export async function createPost(data:{
    text: string,
    title: string

} ) :Promise<PostResult>{
    try{
        const response = await fetch("/api/v1/posts",{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        return await (response.json()) as PostResult;
    }
    catch(error){
        console.error(error)
        return{
            ok:false,
            error:{
                code: 500,
                message:"could not contact server, or theres something wrong with the query",
                fieldErrors:{}
            } 
        } 
    }

}


export async function updatePost(
  id: number,
  data: { text?: string; title?: string },
): Promise<PostResult> {
  try {
    const response = await fetch(`/api/v1/posts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return (await response.json()) as PostResult;
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      error: {
        code: 500,
        message: "could not contact server, or theres something wrong with the query",
        fieldErrors: {},
      },
    };
  }
}

export async function getPost(id: number): Promise<PostResult> {
  try {
    const response = await fetch(`/api/v1/posts/${id}`);
    return (await response.json()) as PostResult;
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      error: {
        code: 500,
        message: "could not contact server, or theres something wrong with the query",
        fieldErrors: {},
      },
    };
  }
}


export async function removePost(id:number): Promise<RemovePostResult>{
    try{
         const response = await fetch(`/api/v1/posts/${id}`, {
            method: "DELETE",
         })
         console.log(response.ok, response.status, response.statusText);
         if(response.ok){
            return{
            ok: true, 
            data:{
                id,
            }}
         }
         const body = (await response.json()) as {error: AppError};
         return{
            ok: false,
            error: body.error
         }
    }
    catch(error){
        console.error(error);
        return{
            ok:false, 
            error:{
                code: 500,
                message: "could not contact server, or theres something wrong with the query"
            }
        } 
    }
}