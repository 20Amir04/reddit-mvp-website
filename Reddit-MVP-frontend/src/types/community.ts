export type Community = {
    id: number;
    name: string;
    description: string;
    bannerImageUrl: string | null;
    createdAt: string;
    creatorUsername: string;
    membersCount: number;
    isMember: boolean;
};

export type CreateCommunityRequest = {
    name: string;
    description: string;
    bannerImageUrl?: string | null;
};

export type CreateCommunityResponse = {
    message: string;
    community: Community;
};

export type UpdateCommunityRequest = {
    description: string;
    bannerImageUrl?: string | null;
};

export type UpdateCommunityResponse = {
    message: string;
    community: Community;
};