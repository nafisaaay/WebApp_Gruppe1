import { describe, it, expect } from "vitest";
import { canUnlikePost } from "../authorization/authorizeUnlike";

describe("canUnlikePost", () => {
    it("accepts a valid user who is logged in", () => {
        const result = canUnlikePost(
            { user: { id: "1" } },
            "unlike",
            { id: "1", userId: "1", likedBy: ["1"] }
        );
        expect(result).toEqual({ ok: true });
    });

    it("rejects a user who is not logged in", () => {
        const result = canUnlikePost(
            null,
            "unlike",
            { id: "1", userId: "1", likedBy: [] }
        );
        expect(result).toEqual({
            ok: false,
            error: "User must be logged in to unlike a post",
        });
    });
    it("reject when no target post is provided", () => {
        const result = canUnlikePost(
            { user: { id: "1" } },
            "unlike",
            null
        );
        expect(result).toEqual({
            ok: false,
            error: "Target post is required for unliking",
        });
    });
    it("rejects a user who has not liked the post yet", () => {
        const result = canUnlikePost(
            { user: { id: "1" } },
            "unlike",
            { id: "1", userId: "1", likedBy: [] }
        );
        expect(result).toEqual({
            ok: false,
            error: "User has not liked this post yet",
        });
    });
    
});