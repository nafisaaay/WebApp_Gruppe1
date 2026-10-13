export interface BaseRepository<T, TInput>{
   getAll:(userId?:string)=> Promise<T[]>
   create:(input: TInput, userId: string)=> Promise<T>;
   get:(id: string, userId?: string)=> Promise<T | null>;
   update?:( id: string, input: TInput, userId: string)=>Promise<T | void>;
   remove:(id: string, userId: string)=>Promise<void>;
}