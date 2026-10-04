import { describe, it, expect } from "vitest";
import { canCommentOnPost } from "../authorization/authorizeComment";


describe("canCommentOnPost", ()=> {
    it("accepts a comment from a valid user"), () => {
        const result = canCommentOnPost(
            { user: { id: 1 } },
            "comment",
            { id: 1 }
        );
        expect(result).toEqual({ ok: true });
    },
    it("rejects a comment from a user who is not logged in"), () => {
        const result = canCommentOnPost(
            null,
            "comment",
            { id: 1 }
        );
        expect(result).toEqual({
            ok: false,
            error: "User must be logged in to comment on a post",
        });
    }
});



