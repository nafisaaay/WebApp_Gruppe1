import type { Post, User } from "@/db/schema/schema";

export type PostWithAuthor = Post & {
    author: Pick<User, "id" | "name">;
    likeCount: number;
    likedByMe: boolean;
};

export type PostDTO = {
    id: number;
    title: string;
    text: string;
    userId: string;
    likeCount: number;
    likedByMe: boolean;
    userName: string;
    createdAt: string;
    updatedAt: string;
}

export function toPostDTO(post : PostWithAuthor) : PostDTO{
    const { id, title, text, userId, author, createdAt, updatedAt,likeCount, likedByMe } = post;
    return{
        id,
        title,
        text,
        userId,
        likeCount,
        likedByMe,
        userName: author.name,
        createdAt: createdAt.toISOString(),
        updatedAt: updatedAt.toISOString(),
    }
}