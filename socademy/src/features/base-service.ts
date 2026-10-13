

export interface BaseService<T, TInput>{
    getAll:(userId?:string)=> Promise<T[]>
    create:(input: TInput, userId: string)=> Promise<T>;
    get:(id: string, userId?: string)=> Promise<T>;
    update?:( id: string, input: TInput, userId: string)=>Promise<T>;
    remove:(id: string, userId: string)=>Promise<void>
}