export type CommentReply = {
    id: number;
    content: string;
    createdAt: string;
    updatedAt: string | null;
    postId: number;
    parentCommentId: number | null;
    authorId: string;
    authorUsername: string;
};

export type Comment = CommentReply & {
    replies: CommentReply[];
};

export type CreateCommentRequest = {
    content: string;
    parentCommentId: number | null;
};

export type CreateCommentResponse = {
    message: string;
    comment: Comment;
};

export type UpdateCommentRequest = {
    content: string;
};