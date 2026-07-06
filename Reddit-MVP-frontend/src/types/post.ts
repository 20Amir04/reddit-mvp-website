export type Post = {
    id: number;
    title: string;
    content: string;
    communityName: string;
    authorUsername: string;
    voteScore: number;
    commentsCount: number;
    createdAt: string;
    tag?: string;
};