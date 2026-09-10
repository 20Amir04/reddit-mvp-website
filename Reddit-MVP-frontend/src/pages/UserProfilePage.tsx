import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUsersPosts, getUserProfile } from "../api/userApi";
import PostCard from "../components/PostCard";
import type { Post } from "../types/post";
import type { UserProfile } from "../types/user";
import { useAuth } from "../context/AuthContext";

function UserProfilePage() {
    const {username} = useParams();
    const {user} = useAuth();

    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);

    const [isLoading, setIsLoading] = useState(true);
    const [arePostsLoading, setArePostsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadProfile() {
            if (!username) {
                setError("Username is missing");
                setIsLoading(false);
                setArePostsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                setArePostsLoading(true);
                setError("");

                const profileData = await getUserProfile(username);
                setProfile(profileData);

                const postsData = await getUsersPosts(username);
                setPosts(Array.isArray(postsData) ? postsData : []);
            } catch (error: any) {
                const message = error.response?.data?.message ?? "User Profile not found";

                setError(message);
            } finally {
                setIsLoading(false);
                setArePostsLoading(false);
            }
        }

        loadProfile();
    }, [username]);

    if (isLoading) {
        return(
            <main className="mx-auto max-w-5xl px-3 py-6 sm:px-4 lg:px-6">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-neutral-400">
                    Loading profile...
                </div>
            </main>
        );
    }

    if (error && !profile) {
        return(
            <main className="mx-auto max-w-5xl px-3 py-6 sm:px-4 lg:px-6">
                <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-sm text-red-300">
                    {error}
                </div>
            </main>
        );
    }

    if (!profile) {
        return null;
    }

    const isOwnProfile = user?.username === profile.username;

    return(
        <main className="mx-auto max-w-5xl px-3 py-6 sm:px-4 lg:px-6">
            <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                <div className="h-28 bg-gradient-to-r from-orange-500/70 to-orange-900/40 sm:h-36" />

                <div className="p-5 sm:p-6">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <div className="mt-14 flex h-20 w-20 items-center justify-center rounded-full border-4 border-neutral-950 bg-orange-500 text-2xl font-bold text-white sm:h-24 sm:w-24 sm:text-3xl">
                                {profile.username.charAt(0).toUpperCase()}
                            </div>

                            <h1 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
                                u/{profile.username}
                            </h1>

                            <p className="mt-2 text-sm text-neutral-400">
                                Registered on{" "}
                                {new Date(profile.createdAt).toLocaleDateString()}
                            </p>

                            {isOwnProfile && profile.email && (
                                <p className="mt-2 text-sm text-neutral-400">
                                    Email:{" "}
                                    <span className="text-neutral-200">{profile.email}</span>
                                </p>
                            )}
                        </div>

                            {isOwnProfile && (
                                <div className="rounded-xl border border-orange-500/30 bg-orange-500/10 px-4 py-3 text-sm text-orange-300">
                                    This is your profile.
                                </div>
                            )}
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                            <p className="text-sm text-neutral-400">Karma</p>
                            <p className="mt-2 text-2xl font-bold text-white">{profile.karma}</p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                            <p className="text-sm text-neutral-400">Posts</p>
                            <p className="mt-2 text-2xl font-bold text-white">{profile.postsCount}</p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                            <p className="text-sm text-neutral-400">Comments</p>
                            <p className="mt-2 text-2xl font-bold text-white">{profile.commentsCount}</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mt-5">
                <div className="mb-4 rounded-2xl border border-white/10 bg-white/5 p-5">
                    <h2 className="text-xl font-bold text-white">
                        Posts by u/{profile.username}
                    </h2>

                    <p className="mt-2 text-sm text-neutral-400">
                        All posts created by this user.
                    </p>
                </div>

                {arePostsLoading && (
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-neutral-400">
                        Loading user`s posts...
                    </div>
                )}

                {!arePostsLoading && posts.length === 0 && (
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-neutral-400">
                        This user has not created any posts yet.
                    </div>
                )}

                {!arePostsLoading && posts.length > 0 && (
                    <div className="space-y-4">
                        {posts.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
export default UserProfilePage;