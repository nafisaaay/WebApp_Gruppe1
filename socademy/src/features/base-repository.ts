import type { Result, EmptyResult } from "./results"

export interface BaseRepository<T, TCreate, TUpdate, TParams> {
  getAll: (params?: TParams, userId?: string) => Promise<Result<T[]>>;
  create: (data: TCreate) => Promise<Result<T>>;
  get: (id: string, userId?: string) => Promise<Result<T | null>>;
  update: (id: string, data: TUpdate, userId: string) => Promise<Result<T | null>>;
  remove: (id: string, userId: string) => Promise<EmptyResult>;
}