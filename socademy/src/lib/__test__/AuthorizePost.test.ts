import { describe, it, expect } from "vitest";
import { canCreatePost, canDeletePost } from "../authorization/authorizePost";


describe("canDeletePost", () => {
  it("rejects a user who deletes a post that's not theirs", () => {
    const result = canDeletePost(
      { user: { id: 1 } },
      "delete",
    { id: 1, userId: 2 }
    );

    expect(result).toEqual({
      ok: false,
      error: "User does not have permission to delete this post",
    });
  });

  it("allows a user to delete their own post", () => {
    const result = canDeletePost(
      { user: { id: 1 } },
      "delete",
      { id: 1, userId: 1 }
    );

    expect(result).toEqual({ ok: true });
  });
  
 it("rejects a user who is not logged in", () => {
  const result = canDeletePost(
    null,  
    "delete",
    { id: 1, userId: 1 }
                       
  );
  expect(result).toEqual({
    ok: false,
    error: "User must be logged in to delete a post",
  });
});

});

describe("canCreatePost", () => {
    it("rejects a user who is not logged in", () => {
        const result = canCreatePost(
        null,
        "create",
        { text: "Example post" }
        );
        expect(result).toEqual({
        ok: false,
        error: "User must be logged in to create a post",
        });
    });
    it("allows a logged-in user to create a post", () => {
        const result = canCreatePost(
        { user: { id: 1 } },
        "create",
        { text: "Example post" }
        );
        expect(result).toEqual({ ok: true });
    });
    it("rejects a logged-in user to create a post on someone else's behalf", () => {
        const result = canCreatePost(
        { user: { id: 1 } },
        "create",
        { text: "Example post", userId: 2 }
        );
        expect(result).toEqual({
        ok: false,
        error: "User does not have permission to create a post for another user",
        });
    });

});