import { api } from "./axios";
import type { Community, CreateCommunityRequest, CreateCommunityResponse, UpdateCommunityRequest, UpdateCommunityResponse } from "../types/community";

export async function getCommunities() {
    const response = await api.get<Community[]>("/communities");
    return response.data;
}

export async function getCommunityByName(name: string) {
    const response = await api.get<Community>(`/communities/${name}`);
    return response.data;
}

export async function createCommunity(data: CreateCommunityRequest) {
    const response = await api.post<CreateCommunityResponse>(
        "/communities",
        data
    );

    return response.data;
}

export async function joinCommunity(communityId: number) {
    const response = await api.post<{message: string}>(
        `/communities/${communityId}/join`
    );

    return response.data;
}

export async function leaveCommunity(communityId: number) {
    const response = await api.delete<{message: string}>(
        `/communities/${communityId}/leave`
    );

    return response.data;
}

export async function updateCommunity(communityId: number, data: UpdateCommunityRequest) {
    const response = await api.put<UpdateCommunityResponse>(
        `/communities/${communityId}`,
        data
    );

    return response.data;
}