import type { BaseController } from "../base-controller";
import { eventsService } from "./events-service";

export const eventsController: BaseController = {
// Opprette et event
  create: async (requestInfo) => {
    const userId = requestInfo.ctx.session.userId;
    const input = await requestInfo.request.json();

  if (!userId) {
  return Response.json(
    { ok: false, error: { code: 401, message: "Du må være innlogget" } },
    { status: 401 },
  );
}
const result = await eventsService.create(input, userId);
    return Response.json(result, {
      status: result.ok ? 201 : result.error.code,
    });
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

  update: async (requestInfo) => {
    return Response.json({ message: "Endre et event" });
  },
};