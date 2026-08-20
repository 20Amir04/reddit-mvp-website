export type Community = {
    id: number;
    name: string;
    description: string;
    bannerImageUrl: string | null;
    createdAt: string;
    creatorUsername: string;
    membersCount: number;
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