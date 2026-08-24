import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deletePost, getPostById } from "../api/postApi";
import type { PostDetails } from "../types/post";
import { useAuth } from "../context/AuthContext";

function PostDetailsPage() {
    const {postId} = useParams();
    const navigate = useNavigate();
    const {user, isAuthenticated} = useAuth();

    const [post, setPost] = useState<PostDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadPost() {
            const numericPostId = Number(postId);

            if (!numericPostId) {
                setError("Invalid post id.");
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                setError("");

                const data = await getPostById(numericPostId);
                setPost(data);
            } catch {
                setError("Post not found.");
            } finally {
                setIsLoading(false);
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
                    <span className="rounded-full bg-black/20 px-3 py-1.5">
                        {post.voteScore} votes
                    </span>

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

                <p className="mt-2 text-sm text-neutral-400">
                    Comments will appear here later.
                </p>
            </section>
        </main>
    );
}
export default PostDetailsPage;