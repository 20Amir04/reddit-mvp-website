import { api } from "./axios";
import type { Comment,CreateCommentRequest, CreateCommentResponse, UpdateCommentRequest } from "../types/comment";

export async function getPostComments(postId: number) {
    const response = await api.get<Comment[]>(`/posts/${postId}/comments`)
    
    return response.data;
}

export async function createComment(postId: number, data: CreateCommentRequest) {
    const response = await api.post<CreateCommentResponse>(`/posts/${postId}/comments`, data);

    return response.data;
}

export async function updateComment(commentId: number, data: UpdateCommentRequest) {
    const response = await api.put<{message: string}>(`/comments/${commentId}`, data)

    return response.data;
}

export async function deleteComment(commentId: number) {
    const response = await api.delete<{message: string}>(`/comments/${commentId}`);

    return response.data;
}