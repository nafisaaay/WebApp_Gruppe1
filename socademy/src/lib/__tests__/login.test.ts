import { describe, it, expect } from "vitest";
import { validateEmail, SCHOOL_DOMAIN, validatePassword } from "../login";

/* E-post-validering:
1. Tom epost og epost med bare mellomrom/tab.
2. Ugyldig format: Mangler @, 2 @, mellomrom inni, mangler brukernavn, mangler toppdomene.
3. Feil domene + lookalike domener.
4. Gyldige varianter godtas: punktum, bindestrek, plusstegn, store bokstaver og mellomrom rundt.
5. En altfor lang e-post (brukernavn + domene over 100 tegn) avvises.
*/

describe("validateEmail", () => {
    it("Avvise tom epost og epost med bare mellomrom/tab", () => {
        for (const email of ["", " ", "\n\t"]) {
            expect(validateEmail(email).ok).toBe(false);
        }
    });

    it("Avvise feil domene + lookalike domener", () => {
        const invalidDomain = [
            "ola@hotmail.com",
            `ola@evil${SCHOOL_DOMAIN}`,
            `ola@${SCHOOL_DOMAIN}.evil.com`
        ];

        for (const email of invalidDomain) {
            expect(validateEmail(email).ok, email). toBe(false);
        }
    });

    it("Avvise ugyldig format: Mangler @, 2 @, mellomrom inni, mangler brukernavn, mangler toppdomene", () => {
        const invalidFormat = [
            "ola",
            "ola@@",
            "ola@",
            "ola nordmann@hiof.no",
            "@hiof.no",
            "ola@hiof"
        ];

        for (const email of invalidFormat) {
            expect(validateEmail(email).ok).toBe(false);
        }
    });

    it("Gyldige varianter godtas: punktum, bindestrek, plusstegn, store bokstaver", () => {
        const validFormat = [
            `ola.nordmann@${SCHOOL_DOMAIN}`,
            `ola-nordmann@${SCHOOL_DOMAIN}`,
            `ola+nordmann@${SCHOOL_DOMAIN}`,
            `ola.nordmann@${SCHOOL_DOMAIN.toUpperCase()}`,
        ];
        for (const email of validFormat) {
            expect(validateEmail(email).ok, email).toBe(true);
        }
    });


    it("En altfor lang e-post (over 100 tegn) avvises", () => {
        expect(validateEmail("a".repeat(101)).ok).toBe(false);
    });

});


/* Passord-validering:
1. Tomt passord og passord med bare mellomrom eller tab avvises.
2. Lengdegrensene: Minst 8 tegn, Max 128.
3. æ, ø, å og spesialtegn godtas.
4. null, undefined, feil typer gir ok: false istedenfor krasj.
*/

describe("validatePassword", () => {
    it("Tomt passord og passord med bare mellomrom eller tab avvises", () => {
        for (const pswrd of ["", " ", "\n\t"]) {
            expect(validatePassword(pswrd).ok).toBe(false);
        }
    });

    it("Lengdegrensene: Minst 8 tegn, Max 128", () => {  
       const pswrdMin = 8;
       const pswrdMax = 128;

       expect(validatePassword("a".repeat(pswrdMin - 1)).ok).toBe(false); 
       expect(validatePassword("a".repeat(pswrdMin)).ok).toBe(true); 
       expect(validatePassword("a".repeat(pswrdMax)).ok).toBe(true);
       expect(validatePassword("a".repeat(pswrdMax + 1)).ok).toBe(false); 
    });
    
    it("æ, ø, å og spesialtegn godtas", () => {
        const specialCharacters = [
            "blåblærsyltetøy",
            "ÆØÅæøå123",
            `p'a"ss\\word%;--1`,
            "pass word 123!"
        ];
        for (const pswrd of specialCharacters) {
            expect(validatePassword(pswrd).ok, pswrd).toBe(true);
        }
    });
}); 
