export type Params = Record<string, string | undefined>;

export function parseParams(request : Request){
    return Object.fromEntries(new URL (request.url).searchParams);
}