import type { Result, EmptyResult } from "./results"

export interface BaseRepository<T, TCreate, TUpdate, TParams, TId = number | string> {
  getAll: (params?: TParams, userId?: string) => Promise<Result<T[]>>;
  create: (data: TCreate) => Promise<Result<T>>;
  get: (id: TId, userId?: string) => Promise<Result<T | null>>;
  update: (id: TId, data: TUpdate, userId?: string) => Promise<Result<T | null>>;
  remove: (id: TId, userId?: string) => Promise<EmptyResult>;
}