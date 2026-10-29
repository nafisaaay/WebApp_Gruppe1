import { env } from "cloudflare:workers";
import { APIError, betterAuth } from 'better-auth';
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from '@/db';
import { account, session, verification } from "@/db/schema/auth-schema";
import { user } from "@/db/schema/schema";
import { SCHOOL_DOMAIN, PSWRD_MIN, PSWRD_MAX  } from "../user/validation/validateLogin";
import { expo } from "@better-auth/expo";

if (!env.BETTER_AUTH_SECRET) {
    throw new Error("BETTER_AUTH_SECRET er ikke satt (.dev.vars lokalt, secret i prod).");
}

export const auth = betterAuth ({
    database: drizzleAdapter(db, {
        provider: "sqlite",
        schema: {
            user,
            session,
            account,
            verification
        },
    }),

    secret: env.BETTER_AUTH_SECRET,
    baseURL: env.BETTER_AUTH_URL,

    // Slår på innloggingen med epost/passort. 
    emailAndPassword: {
        enabled: true,
        autoSignIn: true, // = man blir logget inn rett ett registrering - passer dette her egentlig?
        minPasswordLength: PSWRD_MIN,
        maxPasswordLength: PSWRD_MAX,
    },
    
    user: { // for bruk av roller og admin.
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "user",
                input: false,
            },
        },
    },

    databaseHooks: {
        user: {
            create: {
                before: async (user) => {
                    const email = user.email.trim().toLowerCase();
                    if (!email.endsWith(`@${SCHOOL_DOMAIN}`)){
                        throw new APIError("BAD_REQUEST", {
                            message: `E-posten må være en @${SCHOOL_DOMAIN}-adresse.`,
                        });
                    }
                    return {data: { ...user, email }};
                }
            }
        }
    },

    // Hvor lenge en innlogging/sesjon skal vare. 
    session: {
        expiresIn: 60 * 60 * 24 * 7, // 7 dager
        updateAge: 60 * 60 * 24, // forlenger cookie dagvis ved aktivitet (eks. bruker appen).
        /*
        cookieCache: {
            enabled: true,
            maxAge: 5 * 60, // 5min
        },*/
    },

    // Cookier og ID kan IKKE leses av JS/ httpOnly, og sendes bare over HTTPs, og sendes IKKE med fra andre nettsider (sameSite). 
    // Alle nye rader får en tilfeldig ID.
    advanced: {
        cookies: {
            sessionToken: {
                attributes: { httpOnly: true, secure: true, sameSite: "lax" },
            },
        },
        database: {
            generateId: () => crypto.randomUUID(),
        },
    },

    // Mobil (Expo) er ikke en nettleser og sender ikke Orgin-header.
    // expo()-pluginen oversetter appens "expo-origin" til en vanlig Origin.
    plugins: [expo()],

    // Opphav serveren stoler på i tillegg til sin egen adresse.
    // socademy:// = appens scheme (app.json).
    // exp:// = Expo Go under utvikling.
    trustedOrigins: ["socademy://", "exp://**"],
});

export type AuthSession = typeof auth.$Infer.Session;