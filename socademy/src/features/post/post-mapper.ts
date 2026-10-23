import type { Post } from "@/db/schema";

export type PostDTO = {
    id: number;
    title: string;
    text: string;
    userId: string;
    userName: string;
    createdAt: string;
    updatedAt: string;
}

export function toPostDTO(post : Post) : PostDTO{
    const { id, title, text, userId, userName, createdAt, updatedAt } = post;
    return{
        id,
        title,
        text,
        userId,
        userName,
        createdAt: createdAt.toISOString(),
        updatedAt: updatedAt.toISOString(),
    }
}