import type { Post } from "./post";

export type UserProfile = {
    id: string;
    username: string;
    email: string | null;
    createdAt: string;
    postsCount: number;
    commentsCount: number;
    karma: number;
};

export type UserPostsResponse = Post[];