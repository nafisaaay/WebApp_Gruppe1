import type { BaseController } from "../base-controller";
import { eventsService } from "./events-service";
import type { CreateEventInput } from "./events-validation";

export const eventsController: BaseController = {
// Opprette et event
  create: async (requestInfo) => {
    const input = await requestInfo.request.json();

    const result = await eventsService.create(input as CreateEventInput, "");
    return Response.json(result, {
      status: result.ok ? 201 : result.error.code,
    });
},

  // Hente kun en event
  get: async (requestInfo) => {
    const id  = requestInfo.params.id;
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
    const id  = requestInfo.params.id;
    const result = await eventsService.remove(id, "");
    return Response.json(result, {
      status: result.ok ? 200 : result.error.code,
    });
  },


// Endre event

  update: async (requestInfo) => {
    return Response.json({ message: "Endre et event" });
  },
};