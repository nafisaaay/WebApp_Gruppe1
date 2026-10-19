import type { BaseController } from "../base-controller";

export const eventsController: BaseController = {
  create: async (requestInfo) => {
    return Response.json({ message: "Opprette et event" });
  },

  get: async (requestInfo) => {
    return Response.json({ message: "Hente ett event" });
  },

  getAll: async (requestInfo) => {
    return Response.json({ message: "Hente alle events" });
  },

  remove: async (requestInfo) => {
    return Response.json({ message: "Slette et event" });
  },

  update: async (requestInfo) => {
    return Response.json({ message: "Endre et event" });
  },
};