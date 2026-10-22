//Kode er lagt inn som kode i package.sjon
//Kjøre seeding: pnpm db:seed
//NB! filplassering 

import { defineScript } from "rwsdk/worker";
import { drizzle } from "drizzle-orm/d1";
import { user } from './schema';

export default defineScript(async ({ env }) => {
  const db = drizzle(env.DB);

  // Insert a user
  await db.insert(user).values({
    name: "Test user",
    email: "test@testuser.io",
    role: "student"
  });

  // Verify the insert by selecting all users
  const result = await db.select().from(user).all();

  console.log("🌱 Finished seeding");

  return Response.json(result);
});