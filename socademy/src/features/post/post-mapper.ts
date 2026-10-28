import type { Post, User } from "@/db/schema/schema";

export type PostWithAuthor = Post & {
    author: Pick<User, "id" | "name">;
};

export type PostDTO = {
    id: number;
    title: string;
    text: string;
    userId: string;
    userName: string;
    createdAt: string;
    updatedAt: string;
}

export function toPostDTO(post : PostWithAuthor) : PostDTO{
    const { id, title, text, userId, author, createdAt, updatedAt } = post;
    return{
        id,
        title,
        text,
        userId,
        userName: author.name,
        createdAt: createdAt.toISOString(),
        updatedAt: updatedAt.toISOString(),
    }
}