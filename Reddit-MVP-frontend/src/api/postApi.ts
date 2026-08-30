import { api } from "./axios";
import type { CreatePostRequest, CreatePostResponse, Post, PostDetails, UpdatePostRequest } from "../types/post";

export async function getPosts(sort = "new") {
    const response = await api.get<Post[]>(`/posts?sort=${sort}`);
    return response.data;
}

export async function getPostById(postId: number) {
    const response = await api.get<PostDetails>(`/posts/${postId}`)
    return response.data;
}

export async function getCommunityPosts(communityName: string) {
    const response = await api.get<Post[]>(`/communities/${communityName}/posts`);
    return response.data;
}

export async function createPost(data:CreatePostRequest) {
    const response = await api.post<CreatePostResponse>("/posts", data);
    return response.data;
}

export async function UpdatePost(postId: number, data: UpdatePostRequest) {
    const response = await api.put<{message: string}>(`/posts/${postId}`, data);
    return response.data;
}

export async function deletePost(postId: number) {
    const response = await api.delete<{message: string}>(`/posts/${postId}`);
    return response.data;
}

export async function votePost(postId: number, value: 1 | -1) {
    const response = await api.post<{ message: string; voteScore: number}>(
        `/posts/${postId}/vote`,
        {value}
    );

    return response.data;
}