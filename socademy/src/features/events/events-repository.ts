import { eq } from "drizzle-orm";
import { db, type DB } from "@/db";
import { events, type Event, type CreateEvent } from "@/db/schema";


import type { BaseRepository } from "../base-repository";

export interface EventRepository
  extends BaseRepository<Event, CreateEvent, Partial<CreateEvent>, undefined> {}


export function createEventRepository(_db: DB): EventRepository {
  return {
    // Hente alle
    async getAll() {
      try {
        const all = await _db.select().from(events);
        return { ok: true, data: all };
      } catch (error) {
        console.error(error);
        return { ok: false, error: { code: 500, message: "Kunne ikke hente alle events" } };
      }
    },


    // Lag ny
    async create(data) {
      try {
        const created = await _db
          .insert(events)
          .values(data)
          .returning()
          .get();
        return { ok: true, data: created };
      } catch (error) {
        console.error(error);
        return { ok: false, error: { code: 500, message: "Kunne ikke opprette event" } };
      }
    },

    // Hent én
    async get(id) {
      try {
        const found = await _db
          .select()
          .from(events)
          .where(eq(events.id, Number(id)))
          .get();
        return { ok: true, data: found ?? null };
      } catch (error) {
        console.error(error);
        return { ok: false, error: { code: 500, message: "Kunne ikke hente event" } };
      }
    },

    // Endre
    async update(id, data, _userId) {
      try {
        const updated = await _db
          .update(events)
          .set(data)
          .where(eq(events.id, Number(id)))
          .returning()
          .get();
        return { ok: true, data: updated ?? null };
      } catch (error) {
        console.error(error);
        return { ok: false, error: { code: 500, message: "Kunne ikke oppdatere event" } };
      }
    },

    // Slett
    async remove(id, _userId) {
      try {
        await _db
          .delete(events)
          .where(eq(events.id, Number(id)));
        return { ok: true };
      } catch (error) {
        console.error(error);
        return { ok: false, error: { code: 500, message: "Kunne ikke slette event" } };
      }
    },
  };
}


export const eventRepository = createEventRepository(db);

