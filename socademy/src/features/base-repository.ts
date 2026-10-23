import type { Result, EmptyResult } from "./results"

export interface BaseRepository<T, TCreate, TUpdate, TParams> {
  getAll: (params?: TParams, userId?: string) => Promise<Result<T[]>>;
  create: (data: TCreate) => Promise<Result<T>>;
  get: (id: number, userId?: string) => Promise<Result<T | null>>;
  update: (id: number, data: TUpdate, userId?: string) => Promise<Result<T | null>>;
  remove: (id: number, userId?: string) => Promise<EmptyResult>;
}