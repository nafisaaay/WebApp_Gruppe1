import { env } from 'cloudflare:workers';
import { betterAuth } from 'better-auth';


if (!env.BETTER_AUTH_SECRET) {
  throw new Error("BETTER_AUTH_SECRET er ikke satt (.dev.vars lokalt, secret i prod).");
}

export const auth = betterAuth ({
    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
        minPasswordLength: 8,
    }


})