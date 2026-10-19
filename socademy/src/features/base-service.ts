
import type { Result, EmptyResult } from "./results"

export interface BaseService<T, TInput, TParams>{
    create:(input: unknown, userId: string) =>Promise<Result<T>>
    get:(id: string, userId?: string)=> Promise<Result<T>>
    getAll:(params?: TParams, userId?:string)=>Promise<Result<T[]>>
    update:( id: string, input: unknown, userId: string)=> Promise<Result<T>>
    remove :(id: string, userId: string)=>Promise<EmptyResult>

}