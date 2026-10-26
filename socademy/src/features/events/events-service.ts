import { z } from "zod";
import type { BaseService } from "../base-service";
import type { Event } from "@/db/schema";
import { eventSchema, type CreateEventInput } from "./events-validation";
import { eventRepository } from "./events-repository";

export const eventsService: BaseService<Event, CreateEventInput> = {
  create: async (input, userId) => {
    const parsed = eventSchema.safeParse(input);
    if (!parsed.success) {
      return {
        ok: false,
        error: {
          code: 400,
          message: "Invalid input",
          fieldErrors: z.flattenError(parsed.error).fieldErrors,
        }
      };
    }
    return await eventRepository.create(parsed.data);
  },

  get: async (id, userId) => {
    const result = await eventRepository.get(id);

    if (!result.ok) return result;

    if (!result.data) {
      return {
        ok: false,
        error: {
          code: 404,
          message: "Event finnes ikke"
        }
      };
    }
    return { ok: true, data: result.data };

  },

  getAll: async (userId) => {
    return await eventRepository.getAll();
  },

  remove: async (id, userId) => {
    const result = await eventRepository.get(id);
    if (!result.ok) return result;
    if (!result.data) {
      return {
        ok: false,
        error: {
          code: 404,
          message: "Event finnes ikke"
        }
      };
    }
    return await eventRepository.remove(id, userId);
  },
};