export type ValidationResult = {ok: true} | {ok: false; error: string};

export const SCHOOL_DOMAIN = "hiof.no";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //[^\s@]+ betyr hver gang det samme: ett eller flere tegn som ikke er mellomrom og ikke @.

const PSWRD_MIN = 8;
const PSWRD_MAX = 128;


export function validateEmail(email: string): ValidationResult {
    if (email.length === 0 || email.trim().length === 0) {
        return {ok: false, error: "E-postadressen kan ikke være tom eller bare whitespace."}
    }
    if (!EMAIL_REGEX.test(email)) {
        return {ok: false, error: "Ugyldig e-postadresse."}
    }
    if (!email.toLowerCase().endsWith(`@${SCHOOL_DOMAIN}`)){
        return {ok: false, error: `E-posten må være en ${SCHOOL_DOMAIN} adresse.`}
    }

    return {ok: true};
}


export function validatePassword(pswrd: string): ValidationResult {
    if (typeof pswrd !== "string" || pswrd.trim() === "") { // denne avviser alt som ikke er tekst, tom tekst, \n\t (tomme etter .trim)
        return {ok: false, error: "Passord er påkrevd."};
    }
    if (pswrd.length < PSWRD_MIN) {
        return {ok: false, error: `Passord må være minst ${PSWRD_MIN} tegn.`};
    }
    if (pswrd.length > PSWRD_MAX) {
        return {ok: false, error: `Passord kan ikke være lengre enn ${PSWRD_MAX} tegn.`};
    }

    return {ok: true};
}