import { useState } from "react";
import { Link } from "react-router-dom";
import type { Comment, CommentReply } from "../types/comment";
import { useAuth } from "../context/AuthContext";
import CommentForm from "./CommentForm";

type CommentCardProps = {
    comment: Comment,
    onReply: (parentCommentId: number, content: string) => Promise<void>;
    onUpdate: (commentId: number, content: string) => Promise<void>;
    onDelete: (commentId: number) => Promise<void>;
};

function CommentCard({
    comment,
    onReply,
    onUpdate,
    onDelete,
}: CommentCardProps) {
    const {user, isAuthenticated} = useAuth();

    const [isReplying, setIsReplying] = useState(false);
    const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
    const [isWorking, setIsWorking] = useState(false);
    const [error, setError] = useState("");
    
    const isAuthor = user?.username === comment.authorUsername;

    async function handleReply(content: string) {
        setError("");

        if (!isAuthenticated) {
            setError("Log in to reply.");
            return;
        }

        try {
            setIsWorking(true);
            await onReply(comment.id, content);
            setIsReplying(false);
        } catch {
            setError("Failed to reply.");
        } finally {
            setIsWorking(false);
        }
    }

    async function handleUpdate(commentId: number, content: string) {
        setError("");

        try {
            setIsWorking(true);
            await onUpdate(commentId, content);
            setEditingCommentId(null);
        } catch {
            setError("Failed to update comment.");
        } finally {
            setIsWorking(false);
        }
    }

    async function handleDelete(commentId: number) {
        const confirmed = window.confirm("Delete this comment?");

        if (!confirmed) {
            return;
        }

        setError("");

        try {
            setIsWorking(true)
            await onDelete(commentId);
        } catch {
            setError("Failed to delete comment.");
        } finally {
            setIsWorking(false);
        }
    }

    function renderReply(reply: CommentReply) {
        const isReplyAuthor = user?.username === reply.authorUsername;

        return(
            <div
                key={reply.id}
                className="ml-4 border-1 border-white/10 pl-4 sm:ml-8 sm:pl-5"
            >
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-neutral-400">
                        <Link
                            to={`/u/${reply.authorUsername}`}
                            className="font-semibold text-neutral-200 hover:text-orange-400"
                        >
                            u/{reply.authorUsername}
                        </Link>

                        <span>•</span>

                        <span>{new Date(reply.createdAt).toLocaleDateString()}</span>

                        {reply.updatedAt && (
                            <>
                                <span>•</span>
                                <span>edited</span>
                            </>
                        )}
                    </div>

                    {editingCommentId === reply.id ? (
                        <div className="mt-3">
                            <CommentForm
                                initialValue={reply.content}
                                buttonText="Save"
                                isSubmitting={isWorking}
                                onSubmit={(content) => handleUpdate(reply.id, content)}
                                onCancel={() => setEditingCommentId(null)}
                            />
                        </div>
                    ) : (
                        <p className="mt-3 whitespace-pre-line text-sm leading-6 text-neutral-300">
                            {reply.content}
                        </p>
                    )}

                    {isReplyAuthor && editingCommentId !== reply.id && (
                        <div className="mt-3 flex gap-2 text-xs">
                            <button
                                type="button"
                                onClick={() => setEditingCommentId(reply.id)}
                                className="font-semibold text-neutral-400 hover:text-neutral-200"
                            >
                                Edit
                            </button>

                            <button
                                type="button"
                                onClick={() => handleDelete(reply.id)}
                                disabled={isWorking}
                                className="font-semibold text-red-300 hover:text-red-200 disabled:opacity-60"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return(
        <article className="space-y-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-neutral-400">
                    <Link
                        to={`/u/${comment.authorUsername}`}
                        className="font-semibold text-neutral-200 hover:text-orange-400"
                    >
                        u/{comment.authorUsername}
                    </Link>

                    <span>•</span>

                    <span>{new Date(comment.createdAt).toLocaleString()}</span>

                    {comment.updatedAt && (
                        <>
                            <span>•</span>
                            <span>edited</span>
                        </>
                    )}
                </div>

                {editingCommentId === comment.id ? (
                    <div className="mt-3">
                        <CommentForm
                            initialValue={comment.content}
                            buttonText="Save"
                            isSubmitting={isWorking}
                            onSubmit={(content) => handleUpdate(comment.id, content)}
                            onCancel={() => setEditingCommentId(null)}
                        />
                    </div>
                ) : (
                    <p className="mt-3 whitespace-pre-line text-sm leading-6 text-neutral-300"> 
                        {comment.content}
                    </p>
                )}

                {editingCommentId !== comment.id && (
                    <div className="mt-4 flex gap-3 text-xs">
                        <button
                            type="button"
                            onClick={() => setIsReplying((prev) => !prev)}
                            className="font-semibold text-neutral-400 hover:text-neutral-200"
                        >
                            Reply
                        </button>

                        {isAuthor && (
                            <>
                                <button
                                    type="button"
                                    onClick={() => setEditingCommentId(comment.id)}
                                    className="font-semibold text-neutral-400 hover:text-neutral-200"
                                >
                                    Edit
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleDelete(comment.id)}
                                    disabled={isWorking}
                                    className="font-semibold text-red-300 hover:text-red-200 disabled:opacity-60"
                                >
                                    Delete
                                </button>
                            </>
                        )}
                    </div>
                )}

                {isReplying && (
                    <div className="mt-4">
                        <CommentForm
                            placeholder={`Reply to u/${comment.authorUsername}`}
                            buttonText="Reply"
                            isSubmitting={isWorking}
                            onSubmit={handleReply}
                            onCancel={() => setIsReplying(false)}
                        />
                    </div>
                )}

                {error && (
                    <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                        {error}
                    </div>
                )}
            </div>

            {comment.replies.length > 0 && (
                <div className="space-y-3">
                    {comment.replies.map((reply) => renderReply(reply))}
                </div>
            )}
        </article>
    );
}
export default CommentCard;