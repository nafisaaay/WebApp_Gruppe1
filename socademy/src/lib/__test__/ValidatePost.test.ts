import { describe, it, expect } from "vitest";
import { validatePost } from "../validation/validatePost";

describe("validatePost", () => {
    it("accepts a valid post with text and a user", () => {
        const result = validatePost({
            id: 1,
            text: "post example",
            user: { id: 1 },
        });

        expect(result.ok).toBe(true);
    });
    
    it("rejects a post missing the text field", () => { 
        const result = validatePost({
            id: 1,
            user: { id: 1 },
        });

        expect(result).toEqual({
            ok: false,
            error: "Post must have a text property",
        });
    });
    it("rejects a post with empty text", () => {
        const result = validatePost({
            id: 1,
            text: "",
            user: { id: 1 },
        });

        expect(result.ok).toBe(false);
    });
    it("rejects a post that has more than 500 characters in the text field", () => {
        const longText = "a".repeat(501);
        const result = validatePost({
            id: 1,
            text: longText,
            user: { id: 1 },
        });

        expect(result).toEqual({
            ok: false,
            error: "Post text must not exceed 500 characters",
        });
    });
});