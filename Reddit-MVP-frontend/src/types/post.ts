export type Post = {
    id: number;
    title: string;
    content: string;
    imageUrl: string | null;
    updatedAt: string | null;
    communityName: string;
    authorUsername: string;
    communityId: number;
    voteScore: number;
    commentsCount: number;
    createdAt: string;
    isSaved: boolean;
};

export type PostDetails = Post & {
    authorId: string;
};

export type CreatePostRequest = {
    communityId: number;
    title: string;
    content: string;
    imageUrl?: string | null;
};

export type CreatePostResponse = {
    message: string;
    post: Post;
};

export type UpdatePostRequest = {
    title: string;
    content: string;
    imageUrl?: string | null;
};