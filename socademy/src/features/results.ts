export type AppError = {
  code: number;
  message: string;
  fieldErrors?: Record<string, string[]>;
};

export type Result<T> =
  | { ok: true; data: T }
  | { ok: false; error: AppError };

export type EmptyResult =
  | { ok: true }
  | { ok: false; error: AppError };

