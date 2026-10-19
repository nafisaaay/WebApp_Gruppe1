import { eq } from "drizzle-orm";
import { db, type DB } from "@/db";
import {events, type Event } from "@/db/schema";
import type { BaseRepository } from "../base-repository";
import type { CreateEventInput } from "./events-validation";

import type { Result } from "../results";



export interface EventRepository extends BaseRepository<Event, CreateEventInput> {}
  // create: (event: CreateEvent) => Promise<
  //   | {
  //       ok: true;
  //       data: Event;
  //     }
  //   | {
  //       ok: false;
  //       error: {
  //         code: number;
  //         message: string;
  //         fieldErrors?: Record<string, string[]>;
  //       };
  //     }
  // >;
  update: (id: string, event: any) => Promise<any>;
  get: (id: string) => Promise<any>;
  list: () => Promise<any>;
  remove: (id: string) => Promise<any>;
}

export function createEventRepository(_db: DB): EventRepository {
  return {
    async create(data) {
      try {
        const createEvent = await _db
          .insert(events)
          .values(data)
          .returning()
          .get();

        return {
          ok: true,
          data: createEvent,
        };
      } catch (error) {
        console.error(error);
        return {
          ok: false,
          error: {
            code: 500,
            message: "Noe gikk galt med koden",
            fieldErrors: {},
          },
        };
      }
    }, // implement thi,
    list: () => {
      // her skriver jeg ren sql
    },
    get: (id) => {
      // her bruker prisma
    },
  };
}

//
export const eventRepository = createEventRepository(db);

// repository.create({ title: "My Task", description: "This is my task" });