
import type { Result, EmptyResult } from "./results"

export interface BaseService<T, TParams>{
    create:(input: unknown, userId: string) =>Promise<Result<T>>
    get:(id: number, userId?: string)=> Promise<Result<T>>
    getAll:(params?: TParams, userId?:string)=>Promise<Result<T[]>>
    update:( id: number, input: unknown, userId?: string)=> Promise<Result<T>>
    remove :(id: number, userId?: string)=>Promise<EmptyResult>

}