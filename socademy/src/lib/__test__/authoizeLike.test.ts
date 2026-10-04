import { describe, it, expect } from "vitest";
import { canLikePost } from "../authorization/authorizeLike";

describe("canLikePost", () => {
  it("rejects a user who is not logged in", () => {
    const result = canLikePost(
      null,
      "like",
      { id: 1, userId: 1, likedBy: [] }
    );

    expect(result).toEqual({
      ok: false,
      error: "User must be logged in to like a post",
    });
  });
  it("rejects a user who likes posts twice", () => {
    const result = canLikePost(
      { user: { id: 1 } },
      "like",
      { id: 1, userId: 1, likedBy: [1] }
    );

    expect(result).toEqual({
      ok: false,
      error: "User has already liked this post",
    });
  });
  it("allows a logged-in user to like a post they haven't liked yet", () => {
    const result = canLikePost(
      { user: { id: 2 } },
      "like",
      { id: 1, userId: 1, likedBy: [1] }
    );

    expect(result).toEqual({ ok: true });
  });   
});