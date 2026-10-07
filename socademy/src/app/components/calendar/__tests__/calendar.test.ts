import { describe, expect, it } from "vitest";
import { formatDateNorwegian, getMonthGrid, toDateKey } from "../calendar";

describe("getMonthGrid", () => {
    it("starter alltid på en mandag", () => {
        const grid = getMonthGrid(2026, 9);
        expect(grid[0][0].getDay()).toBe(1);
    });

    it("har alltid 6 uker", () => {
        const grid = getMonthGrid(2026, 9);
        expect(grid.length).toBe(6);
    });

    it("Har alltid 42 dager totalt", () => {
        const grid = getMonthGrid(2026, 9);
        expect(grid.flat()).toHaveLength(42);
    });

    it("Har alltid 7 dager per uke", () => {
        const grid = getMonthGrid(2026, 9);
        expect(grid.every((week) => week.length === 7)).toBe(true);
    });

    it("oktober 2026 (starter torsdag) begynner med 28. september", () => {
        const grid = getMonthGrid(2026, 9);
        expect(toDateKey(grid[0][0])).toBe("2026-09-28");
        expect(toDateKey(grid[0][3])).toBe("2026-10-01");
    });

    it("juni 2026 (starter mandag) begynner på 1. juni", () => {
        const grid = getMonthGrid(2026, 5);
        expect(toDateKey(grid[0][0])).toBe("2026-06-01");
    });

    it("februar 2026 (starter søndag) begynner på 26. januar", () => {
        const grid = getMonthGrid(2026, 1);
        expect(toDateKey(grid[0][0])).toBe("2026-01-26");
        expect(toDateKey(grid[0][6])).toBe("2026-02-01");
    });

    it("andre uke starter på mandagen etter første uke", () => {
        const grid = getMonthGrid(2026, 9);
        expect(toDateKey(grid[1][0])).toBe("2026-10-05");
    });

    it("siste dag i rutenettet for oktober 2026 er 8.november", () => {
        const grid = getMonthGrid(2026, 9);
        expect(toDateKey(grid[5][6])).toBe("2026-11-08");
    });

});

describe("toDateKey", () => {
    it("formaterer en dato som YYYY-MM-DD", () => {
        expect(toDateKey(new Date(2026, 5, 10))).toBe("2026-06-10");
    });

    it("legger til null foran en-sifrede måneder og dager", () => {
        expect(toDateKey(new Date(2026, 0, 5))).toBe("2026-01-05");
        expect(toDateKey(new Date(2026, 11, 1))).toBe("2026-12-01");
        expect(toDateKey(new Date(2026, 5, 10))).toBe("2026-06-10");
    });
});

describe("formatDateNorwegian", () => {
    it("viser datoen på norsk format DD.MM.YYYY", () => {
        expect(formatDateNorwegian(new Date(2026, 9, 14))).toBe("14.10.2026");
    });
});