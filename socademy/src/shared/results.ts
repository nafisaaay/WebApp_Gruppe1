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

export const Errors = {
  badRequest:   { code: 400, message: "Ugyldig input." },
  unauthorized: { code: 401, message: "Du må være logget inn." },
  forbidden:    { code: 403, message: "Ingen tilgang." },
  notFound:     { code: 404, message: "Fant ikke ressursen." },
  server:       { code: 500, message: "Noe gikk galt." },
  notSupported: { code: 501, message: "Ikke støttet." },
} satisfies Record<string, AppError>;
