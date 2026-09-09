import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deletePost, getPostById, votePost } from "../api/postApi";
import type { PostDetails } from "../types/post";
import { useAuth } from "../context/AuthContext";
import { createComment, deleteComment, getPostComments, updateComment } from "../api/commentApi";
import type { Comment } from "../types/comment";
import CommentCard from "../components/CommentCard";
import CommentForm from "../components/CommentForm";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline";

function PostDetailsPage() {
    const {postId} = useParams();
    const navigate = useNavigate();
    const {user, isAuthenticated} = useAuth();

    const [post, setPost] = useState<PostDetails | null>(null);
    const [voteScore, setVoteScore] = useState(0);
    
    const [comments, setComments] = useState<Comment[]>([]);

    const [areCommentsLoading, setAreCommentsLoading] = useState(true);
    const [isCommentSubmitting, setIsCommentSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isVoting, setIsVoting] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadPost() {
            const numericPostId = Number(postId);

            if (!numericPostId) {
                setError("Invalid post id.");
                setIsLoading(false);
                setAreCommentsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                setAreCommentsLoading(true);
                setError("");

                const data = await getPostById(numericPostId);
                setPost(data);
                setVoteScore(data.voteScore);

                const commentsData = await getPostComments(numericPostId);

                if (Array.isArray(commentsData)) {
                    setComments(commentsData);
                } else {
                    setComments([]);
                }
                
            } catch {
                setError("Post not found.");
            } finally {
                setIsLoading(false);
                setAreCommentsLoading(false);
            }
        }

        loadPost();
    }, [postId]);

    async function handleDelete() {
        if (!post) {
            return;
        }

        const confirmed = window.confirm("Are you sure you want to delete this post?");

        if (!confirmed) {
            return;
        }

        try {
            setIsDeleting(true);

            await deletePost(post.id);

            navigate("/");
        } catch (error: any) {
            const message =
                error.response?.data?.message ?? "Failed to delete post.";

            setError(message);
        } finally {
            setIsDeleting(false);
        }
    }

    async function handleVote(value: 1 | -1) {
        if (!post) {
            return;
        }

        setError("");

        if (!isAuthenticated) {
            setError("Log in to vote.");
            return;
        }

        try {
            setIsVoting(true);

            const response = await votePost(post.id, value);

            setVoteScore(response.voteScore);
        } catch (error: any) {
            const message = error.response?.data?.message ?? "Failed to vote on this post.";

            setError(message);
        } finally {
            setIsVoting(false);
        }
    }

    if (isLoading) {
        return (
            <main className="mx-auto max-w-4xl px-3 py-6 sm:px-4 lg:px-6">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-neutral-400">
                    Loading post...
                </div>
            </main>
        );
    }

    if (error && !post) {
        return (
            <main className="mx-auto max-w-4xl px-3 py-6 sm:px-4 lg:px-6">
                <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-sm text-red-300">
                    {error}
                </div>
            </main>
        );
    }

    if (!post) {
        return null;
    }

    async function handleCreateComment(content: string) {
        if (!post) {
            return;
        }

        setError("");

        if (!isAuthenticated) {
            setError("Log in to comment.");
            return;
        }

        try {
            setIsCommentSubmitting(true);

            const response = await createComment(post.id, {
                content,
                parentCommentId: null,
            });

            setComments((currentComments) => [response.comment, ...currentComments]);

            setPost({
                ...post,
                commentsCount: post.commentsCount + 1,
            });
        } catch (error:any) {
            const message = error.response?.data?.message ?? "Failed to create comment.";

            setError(message);
        } finally {
            setIsCommentSubmitting(false);
        }
    }

    async function handleReply(parentCommentId: number, content: string) {
        if (!post) {
            return;
        }

        const response = await createComment(post.id, {
            content,
            parentCommentId,
        });

        const reply = {
            id: response.comment.id,
            content: response.comment.content,
            createdAt: response.comment.createdAt,
            updatedAt: response.comment.updatedAt,
            postId: response.comment.postId,
            parentCommentId: response.comment.parentCommentId,
            authorId: response.comment.authorId,
            authorUsername: response.comment.authorUsername,
        };

        setComments((currentComments) => currentComments.map((comment) => comment.id === parentCommentId ? {
            ...comment,
            replies: [...comment.replies, reply],
        }
        : comment )
        );

        setPost({
            ...post,
            commentsCount: post.commentsCount + 1,
        });
    }

    async function handleUpdateComment(commentId: number, content: string) {
        await updateComment(commentId, {content});

        setComments((currentComments) => 
            currentComments.map((comment) => {
                if (comment.id === commentId) {
                    return {
                        ...comment,
                        content,
                        updatedAt: new Date().toISOString(),
                    };
                }

                return {
                    ...comment,
                    replies: comment.replies.map((reply) => 
                        reply.id === commentId
                            ? {
                                ...reply,
                                content,
                                updatedAt: new Date().toISOString(),
                            }
                            : reply
                        ),
                };
            })
        );
    }

    async function handleDeleteComment(commentId: number) {
        await deleteComment(commentId);

        setComments((currentComments) => {
            const parentComment = currentComments.find(
                (comment) => comment.id === commentId
            );

            if (parentComment) {
                const removedCount = 1 + parentComment.replies.length;

                setPost((currentPost) => 
                    currentPost
                    ?   {
                        ...currentPost,
                        commentsCount: Math.max(currentPost.commentsCount - removedCount, 0),
                    }
                : currentPost
            );

            return currentComments.filter((comment) => comment.id !== commentId)
            }

            setPost((currentPost) => 
                currentPost
                    ? {
                        ...currentPost,
                        commentsCount: Math.max(currentPost.commentsCount - 1, 0),
                    }
                    : currentPost
            );

            return currentComments.map((comment) => ({
                ...comment,
                replies: comment.replies.filter((reply) => reply.id !== commentId),
            }));
        });
    }

    const isAuthor = isAuthenticated && user?.username === post.authorUsername;

    return(
        <main className="mx-auto max-w-4xl px-3 py-6 sm:px-4 lg:px-6">
            <article className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-neutral-400">
                    <Link
                        to={`/r/${post.communityName}`}
                        className="font-semibold text-neutral-200 hover:text-orange-400"
                    >
                        r/{post.communityName}
                    </Link>

                    <span>•</span>

                    <Link
                        to={`/u/${post.authorUsername}`}
                        className="hover:text-neutral-200"
                    >
                        Posted by u/{post.authorUsername}
                    </Link>

                    <span>•</span>

                    <span>{new Date(post.createdAt).toLocaleString()}</span>
                </div>

                <h1 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
                    {post.title}
                </h1>

                <p className="mt-5 whitespace-pre-line text-sm leading-7 text-neutral-300 sm:text-base">
                    {post.content}
                </p>

                {post.imageUrl && (
                    <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="mt-5 max-h-[520px] w-full rounded-xl object-cover"
                    />
                )}

                <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-neutral-400">
                    <div className="flex items-center gap-2 rounded-full bg-black/20 px-3 py-1.5">
                        <button
                            type="button"
                            onClick={() => handleVote(1)}
                            disabled={isVoting}
                            className="text-neutral-400 hover:text-orange-500 disabled:cursor-not-allowed disabled:opacity-50"
                            aria-label="Upvote post"
                        >
                            <ArrowUpIcon className="h-4 w-4"/>
                        </button>

                        <span className="font-semibold text-white">{voteScore}</span>

                        <button
                            type="button"
                            onClick={() => handleVote(-1)}
                            disabled={isVoting}
                            className="text-neutral-400 hover:text-blue-400 disabled:cursor-not-allowed disabled:opacity-50"
                            aria-label="Downvote post"
                        >
                            <ArrowDownIcon className="h-4 w-4"/>
                        </button>
                    </div>
                    
                    <span className="rounded-full bg-black/20 px-3 py-1.5">
                        {post.commentsCount} comments
                    </span>
                </div>

                {isAuthor && (
                    <div className="mt-6 flex flex-wrap gap-2">
                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="rounded-full bg-red-500 px-5 py-2 text-sm font-semibold text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isDeleting ? "Deleting..." : "Delete"}
                        </button>
                    </div>
                )}

                {error && (
                    <div className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                        {error}
                    </div>
                )}
            </article>
            
            <section className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
                <h2 className="text-xl font-bold text-white">Comments</h2>               

                <div className="mt-5">
                    {isAuthenticated ? (
                        <CommentForm
                            isSubmitting={isCommentSubmitting}
                            onSubmit={handleCreateComment}
                        />
                    ) : (
                        <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-neutral-400">
                            Log in to write a comment.
                        </div>
                    )}
                </div>

                <div className="mt-6 space-y-4">
                    {areCommentsLoading && (
                        <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-neutral-400">
                            Loading comments...
                        </div>
                    )}

                    {!areCommentsLoading && comments.length === 0 && (
                        <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-neutral-400">
                            No comments yet. Be the first one to comment.
                        </div>
                    )}

                    {!areCommentsLoading &&
                        Array.isArray(comments) && 
                        comments.map((comment) => (
                            <CommentCard 
                                key={comment.id}
                                comment={{
                                    ...comment,
                                    replies: comment.replies ?? [],
                                }}
                                onReply={handleReply}
                                onUpdate={handleUpdateComment}
                                onDelete={handleDeleteComment}
                            />
                        ))}
                </div>
            </section>
        </main>
    );
}
export default PostDetailsPage;