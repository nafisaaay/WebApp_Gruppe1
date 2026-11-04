//Kode er lagt inn som kode i package.json
//Kjøre seeding: pnpm db:seed
//NB! filplassering 

import { defineScript } from "rwsdk/worker";
import { auth } from "@/features/auth/auth";

export default defineScript(async () => {
  
  try {
    await auth.api.signUpEmail({
      body: { name: "Test Bruker", email: "test@hiof.no", password: "passord123" },
    });
    console.log("🌱 Testbruker opprettet: test@hiof.no / passord123");
  } catch (e) {
    console.log("Brukeren finnes allerede: ", e);
  }
  return Response.json({ ok: true });

});