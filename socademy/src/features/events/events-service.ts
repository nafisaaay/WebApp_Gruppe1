import type { BaseService } from "../base-service";
import type { Event } from "@/db/schema";
import type { CreateEventInput } from "./events-validation";

export const eventsService: BaseService<Event, CreateEventInput> = {
    create: async (data) => {
    return { 
        ok: false,
        code: 501,
        message: "Ikke laget ennå",
    };
    



    }
}