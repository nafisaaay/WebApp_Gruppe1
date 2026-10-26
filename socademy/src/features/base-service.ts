
import type { Result, EmptyResult } from "./results"

export interface BaseService<T, TParams = never, TId extends string | number = string> {
    create:(input: unknown, userId: string) => Promise<Result<T>>;
    get: (id: TId, userId?: string)=> Promise<Result<T>>;
    getAll:(params?: TParams, userId?: string) => Promise<Result<T[]>>;
    update?:( id: TId, input: unknown, userId?: string) => Promise<Result<T>>;
    remove: (id: TId, userId?: string) => Promise<EmptyResult>;

}