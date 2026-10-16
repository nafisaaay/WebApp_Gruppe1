import type { Result, EmptyResult } from "./results"

export interface BaseService<T, TInput>{
    create:(input: TInput, userId: string) =>Promise<Result<T>>
    get:(id: string, userId?: string)=> Promise<Result<T>>
    getAll:(userId?:string)=>Promise<Result<T[]>>
    update?:( id: string, input: TInput, userId: string)=> Promise<Result<T>>
    remove :(id: string, userId: string)=>Promise<EmptyResult>

}