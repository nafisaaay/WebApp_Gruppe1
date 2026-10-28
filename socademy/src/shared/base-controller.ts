import type { RequestInfo } from "rwsdk/worker";
import type { AppError } from "./results";

export interface BaseController{
   create(requestInfo : RequestInfo): Promise<Response>;
   get(requestInfo : RequestInfo): Promise<Response>;
   getAll(requestInfo : RequestInfo): Promise<Response>;
   remove(requestInfo : RequestInfo): Promise<Response>;
   update(requestInfo : RequestInfo): Promise<Response>;
}

// Lager et feilsvar i Result-formatet: { ok: false, error}, med riktig statuskode.
export const fail = (error: AppError) =>
   Response.json({ ok: false, error }, { status: error.code });