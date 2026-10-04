import { describe, it, expect } from "vitest";
import { validateComment } from "../validation/validateComments";

describe("validateComment", () => {
    it("accepts a valid comment with text", () => {
        const result = validateComment({
            id: 1,
            text: "This is a comment",
            user: { id: 1 },
        });

        expect(result.ok).toBe(true);
    });
    it("rejects a comment with empty text", () => {
        const result = validateComment({
            id: 1,
            text: "",
            user: { id: 1 },
        });

        expect(result.ok).toBe(false);
    });
    it("rejects a comment that has more than 100 characters in the text field", () => {
        const longText = "a".repeat(101);  
        const result = validateComment({
            id: 1,
            text: longText,
            user: { id: 1 },
        });

        expect(result).toEqual({
            ok: false,
            error: "Comment text must not exceed 100 characters",
        });
    });
});

