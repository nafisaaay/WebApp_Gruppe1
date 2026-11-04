import { fail, type BaseController } from "@/shared/base-controller";
import { Errors } from "@/shared/results";
import { eventsService } from "./events-service";

export const eventsController: BaseController = {

  // Opprette et event
  create: async (requestInfo) => {

    // 1. Er du logget inn? ellers 401, før vi rører body-en
    const userId = requestInfo.ctx.session.userId;
    if (!userId) return fail(Errors.unauthorized);

    // 2. Er body-en gyldig JSON? ellers 400 i stedet for krasj (500)
    let input: unknown;
    try {
      input = await requestInfo.request.json();
    } catch {
      return fail({ ...Errors.badRequest, message: "Body må være JSON" });
    }

    // 3. Servicen sjekker innholdet med Zod (400) og lagrer (201)
    const result = await eventsService.create(input, userId);
    return Response.json(result, { status: result.ok ? 201 : result.error.code });
  },

  // Hente kun en event
  get: async (requestInfo) => {
    const id  = Number(requestInfo.params.id);
    const result = await eventsService.get(id, "");

    return Response.json(result, {
      status: result.ok ? 200 : result.error.code,
    });  
  
  },

 // Hente alle events
  getAll: async (requestInfo) => {
    const result = await eventsService.getAll();

    return Response.json(result, {
      status: result.ok ? 200 : result.error.code,
    });
  },

  // Slette et event
  remove: async (requestInfo) => {
    const userId = requestInfo.ctx.session.userId;
    if (!userId) {
      return Response.json (
        { ok: false, error: { code: 401, message: "Du må være innlogget"}},
        { status: 401 },
      );
    }
    const id  = Number(requestInfo.params.id);
    const result = await eventsService.remove(id, userId);
    return Response.json(result, {
      status: result.ok ? 200 : result.error.code,
    });
  },

  // Endre event
  update: async () => fail(Errors.notSupported),
};

