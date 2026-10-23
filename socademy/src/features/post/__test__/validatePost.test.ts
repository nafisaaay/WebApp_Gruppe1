import { describe, it, expect } from "vitest";
import { validatePost } from "../validation/validatePost";

describe("validatePost", () => {
    it("accepts a valid post with text and a user", () => {
        const result = validatePost({
            id: 1,
            text: "post example",
            title:"title example",
        });

        expect(result.ok).toBe(true);
    });
    it("rejects a post with empty text", () => {
        const result = validatePost({
            id: 1,
            text: "",
            title: "",
        });

        expect(result.ok).toBe(false);
    });
    it("rejects a post that has more than 500 characters in the text field", () => {
        const longText = "a".repeat(501);
        const result = validatePost({
            id: 1,
            text: longText,
            title: "example",
        });

        expect(result).toEqual({
            ok: false,
            error: "Post text must not exceed 500 characters",
        });
    });
});