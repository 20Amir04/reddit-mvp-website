import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDownIcon, ArrowUpIcon, ChatBubbleOvalLeftIcon, BookmarkIcon, ShareIcon} from "@heroicons/react/24/outline";
import type { Post } from "../types/post";
import { votePost, savePost, unsavePost } from "../api/postApi";
import { useAuth } from "../context/AuthContext";


type PostCardProps = {
    post: Post;
};

function PostCard({post}: PostCardProps) {
    const {isAuthenticated} = useAuth();

    const [voteScore, setVoteScore] = useState(post.voteScore);
    const [isSaved, setIsSaved] = useState(post.isSaved);
    const [isSaving, setIsSaving] = useState(false);

    const [error, setError] = useState("");
    const [isVoting, setIsVoting] = useState(false);

    async function handleVote(value: 1 | -1) {
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

    async function handleSave() {
        setError("");

        if (!isAuthenticated) {
            setError("Log in to save post.");
            return;
        }

        try {
            setIsSaving(true)

            if (isSaved) {
                await unsavePost(post.id);
                setIsSaved(false);
            } else {
                await savePost(post.id);
                setIsSaved(true);
            }
        } catch (error: any) {
            const message = 
                error.response?.data?.message ?? "Failed to update saved post.";

            setError(message);
        } finally {
            setIsSaving(false);
        }
    }

    return(
        <article className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:border-white/20 hover:bg-white/[0.07]">
            <div className="sm:flex">
                <div className="hidden w-14 shrink-0 flex-col items-center gap-2 border-r border-white/10 bg-black/20 py-4 sm:flex">
                    <button 
                        type="button"
                        onClick={() => handleVote(1)}
                        disabled={isVoting}
                        className="text-neutral-400 hover:text-orange-500 disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Upvote post"
                    >
                        <ArrowUpIcon className="h-5 w-5" />
                    </button>

                    <span className="text-sm font-bold text-white">{voteScore}</span>

                    <button 
                        type="button"
                        onClick={() => handleVote(-1)}
                        disabled={isVoting}
                        className="text-neutral-400 hover:text-blue-400 disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Upvote post"
                    >
                        <ArrowDownIcon className="h-5 w-5" />
                    </button>
                </div>

                <div className="flex-1 p-4 sm:p-5">
                    <div className="mb-3 flex items-center justify-between gap-3 sm:hidden">
                        <div className="flex items-center gap-2 rounded-full bg-black/20 px-3 py-1.5">
                            <button 
                                type="button"
                                onClick={() => handleVote(1)}
                                disabled={isVoting}
                                className="text-neutral-400 hover:text-orange-500 disabled:cursor-not-allowed disabled:opacity-50"
                                aria-label="Upvote post"
                            >
                                <ArrowUpIcon className="h-4 w-4" />
                            </button>

                            <span className="text-sm font-bold text-white">
                                {voteScore}
                            </span>

                            <button 
                                type="button"
                                onClick={() => handleVote(-1)}
                                disabled={isVoting}
                                className="text-neutral-400 hover:text-blue-400 disabled:cursor-not-allowed disabled:opacity-50"
                                aria-label="Upvote post"
                            >
                                <ArrowDownIcon className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs" text-neutral-400>
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

                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                    <Link
                        to={`/post/${post.id}`}
                    >
                        <h2 className="mt-3 text-lg font-bold leading-snug text-white hover:text-orange-400 sm:text-xl">
                            {post.title}
                        </h2>
                    </Link>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-neutral-300 sm:text-[15px]">
                        {post.content}
                    </p>

                    {post.imageUrl && (
                        <Link
                            to={`/post/${post.id}`}
                        >
                            <img
                                src={post.imageUrl}
                                alt={post.title}
                                className="mt-4 max-h-96 w-full rounded-xl object-cover"
                            />
                        </Link>
                    )}

                    <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-neutral-400 sm:gap-3">
                        <Link
                            to={`/post/${post.id}`}
                            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 hover:bg-white/10"
                        >
                            <ChatBubbleOvalLeftIcon className="h-4 w-4"/>
                            <span>{post.commentsCount} comments</span>
                        </Link>

                        <button className="flex items-center gap-1.5 rounded-full px-3 py-1.5 hover:bg-white/10">
                            <ShareIcon className="h-4 w-4" />
                            <span>Share</span>
                        </button>

                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={isSaving} 
                            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 disabled:cursor-not-allowed disabled:opacity-60 ${
                                isSaved
                                ? "bg-white/10 text-orange-400"
                                : "text-neutral-400 hover:bg-white/10"
                            }`}
                        >
                            <BookmarkIcon className="h-4 w-4" />
                            <span>{isSaved ? "Saved" : "Save"}</span>
                        </button>
                    </div>

                    {error && (
                        <p className="mt-3 text-sm text-red-300">
                            {error}
                        </p>
                    )}
                </div>
            </div>
        </article>
    );
}   
export default PostCard;