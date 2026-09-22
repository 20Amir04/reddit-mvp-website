import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMySavedPosts } from "../api/postApi";
import PostCard from "../components/PostCard";
import { useAuth } from "../context/AuthContext";
import type { Post } from "../types/post";

function SavedPostsPage() {
    const {isAuthenticated} = useAuth();

    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadSavedPosts() {
            if (!isAuthenticated) {
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                setError("");

                const data = await getMySavedPosts();
                setPosts(Array.isArray(data) ? data : []);
            } catch (error: any) {
                const message =
                    error.response?.data?.message ?? "Failed to load saved posts.";

                setError(message);
            } finally {
                setIsLoading(false);
            }
        }

        loadSavedPosts();
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return(
            <main className="mx-auto max-w-4xl px-3 py-6 sm:px-4 lg:px-6">
                <section className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
                    <h1 className="text-2xl font-bold text-white">
                        Saved Posts
                    </h1>

                    <p className="mt-3 text-sm text-neutral-400">
                        Log in to view your saved posts.
                    </p>

                    <Link
                        to="/login"
                        className="mt-5 inline-flex rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
                    >
                        Log in
                    </Link>
                </section>
            </main>
        );
    }

    return(
        <main className="mx-auto max-w-5xl px-3 py-6 sm:px-4 lg:px-6">
            <section className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">
                    Saved
                </p>

                <h1 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                    Saved Posts
                </h1>

                <p className="mt-3 text-sm leading-6 text-neutral-400">
                    Posts you saved for later.
                </p>
            </section>

            {isLoading && (
                <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-neutral-400">
                    Loading saved posts...
                </div>
            )}

            {error && (
                <div className="mt-5 rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-sm text-red-300">
                    {error}
                </div>
            )}

            {!isLoading && !error && posts.length === 0 && (
                <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-neutral-400">
                    You have not saved any posts yet.
                </div>
            )}

            {!isLoading && !error && posts.length > 0 && (
                <div className="mt-5 space-y-4">
                    {posts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            )}
        </main>
    );
}
export default SavedPostsPage;