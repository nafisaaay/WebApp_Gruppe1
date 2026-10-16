import type { RequestInfo } from "rwsdk/worker";
export interface BaseController{
   create(requestInfo : RequestInfo): Promise<Response>;
   get(requestInfo : RequestInfo): Promise<Response>;
   getAll(requestInfo : RequestInfo): Promise<Response>;
   remove(requestInfo : RequestInfo): Promise<Response>;
   update(requestInfo : RequestInfo): Promise<Response>;
}