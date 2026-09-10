import { api } from "./axios";
import type { UserProfile, UserPostsResponse } from "../types/user";

export async function getUserProfile(username: string) {
    const response = await api.get<UserProfile>(`/users/${username}`);
    return response.data;
}

export async function getUsersPosts(username: string) {
    const response = await api.get<UserPostsResponse>(`/users/${username}/posts`);
    return response.data;
}