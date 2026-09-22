import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getCommunityByName, joinCommunity, leaveCommunity } from "../api/communityApi";
import type { Community } from "../types/community";
import { useAuth } from "../context/AuthContext";
import { getCommunityPosts } from "../api/postApi";
import type { Post } from "../types/post";
import PostCard from "../components/PostCard";

function CommunityDetailsPage() {
    const {communityName} = useParams();
    const {isAuthenticated, user} = useAuth();

    const [community, setCommunity] = useState<Community | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState<Post[]>([]);
    const [arePostsLoading, setArePostsLoading] = useState(true);
    const [actionMessage, setActionMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadCommunity() {
            if (!communityName) {
                setError("Community name is missing.");
                setIsLoading(false);
                setArePostsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                setArePostsLoading(true);
                setError("");

                const data = await getCommunityByName(communityName);
                setCommunity(data);

                const communityPosts = await getCommunityPosts(communityName);
                setPosts(communityPosts);
            } catch {
                setError("Community not found.");
            } finally {
                setIsLoading(false);
                setArePostsLoading(false);
            }
        }

        loadCommunity();
    }, [communityName]);

    async function handleJoin() {
        if (!community) {
            return;
        }

        setError("");
        setActionMessage("");

        if (!isAuthenticated) {
            setError("You need to log in to join this community.");
            return;
        }

        try {
            const response = await joinCommunity(community.id);

            setActionMessage(response.message);
            setCommunity({
                ...community,
                membersCount: community.membersCount + 1,
                isMember: true,
            });
        } catch (error: any) {
            const message = 
                error.response?.data?.message ?? "Failed to Join community.";

                setError(message);  
        }
    }

    async function handleLeave() {
        if (!community)
        {
            return;
        }

        setError("");
        setActionMessage("");

        if (!isAuthenticated) {
            setError("You need to log in first.");
            return;
        }

        try {
            const response = await leaveCommunity(community.id);

            setActionMessage(response.message);
            setCommunity({
                ...community,
                membersCount: Math.max(community.membersCount - 1, 0),
                isMember: false,
            });
        } catch (error: any) {
            const message = error.response?.data?.message ?? "Failed to leave community.";

            setError(message);
        }
    }

    if (isLoading) {
        return (
            <main className="mx-auto max-w-6xl px-3 py-6 sm:px-4 lg:px-6">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-neutral-400">
                    Loading Community...
                </div>
            </main>
        );
    }

    if (error && !community) {
        return (
            <main className="mx-auto max-w-6xl px-3 py-6 sm:px-4 lg:px-6">
                <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-sm text-red-300">
                    {error}
                </div>
            </main>
        );
    }

    if (!community) {
        return null;
    }

    const isCreator = user?.username === community.creatorUsername;

    return(
        <main className="mx-auto max-w-6xl px-3 py-6 sm:px-4 lg:px-6">
            <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                {community.bannerImageUrl ? (
                    <img
                        src={community.bannerImageUrl}
                        alt={`r/${community.name} banner`}
                        className="h-32 w-full object-cover sm:h-40"
                    />
                ) : (
                    <div className="h-32 bg-gradient-to-r from-orange-500/70 to-orange-900/40 sm:h-40"/>
                )}

                <div className="p-5 sm:p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <p className="text-sm font-semibold text-orange-400">
                                r/{community.name}
                            </p>

                            <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                                {community.name}
                            </h1>

                            <p className="mt-3 max-w-3xl text-sm leading-6 text-neutral-400">
                                {community.description}
                            </p>

                            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-neutral-400">
                                <span>{community.membersCount} members</span>
                                <span>Created by u/{community.creatorUsername}</span>
                            </div>
                        </div>

                        <div className="flex shrink-0 gap-2">
                            {community.isMember ? (
                                <button
                                    type="button"
                                    onClick={handleLeave}
                                    className="rounded-full border border-white/10 px-5 py-2 text-sm font-semibold text-neutral-200 hover:bg-white/10"
                                >
                                    Leave
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleJoin}
                                    className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-neutral-950 hover:bg-neutral-200"
                                >
                                    Join
                                </button>
                            )}
                        </div>
                    </div>

                    {isCreator && (
                        <div className="mt-5 rounded-xl border border-orange-500/30 bg-orange-500/10 px-4 py-3 text-sm text-orange-300">
                            You are the creator of this community.
                        </div>
                    )}

                    {error && (
                        <div className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                            {error}
                        </div>
                    )}

                    {actionMessage && (
                        <div className="mt-5 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-300">
                            {actionMessage}
                        </div>
                    )}
                </div>
            </section>

            <section className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>      
                        <h2 className="text-xl font-bold text-white">Community posts</h2>

                        <p className="mt-2 text-sm text-neutral-400">
                            Posts created inside r/{community.name}.
                        </p>
                    </div>

                    <Link
                        to="/create-post"
                        className="inline-flex items-center justify-center rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
                    >
                        Create Post
                    </Link>
                </div>

                <div className="mt-5">
                    {arePostsLoading && (
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-neutral-400">
                            Loading posts...
                        </div>
                    )}

                    {!arePostsLoading && posts.length === 0 && (
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-neutral-400">
                            No posts in this community yet.
                        </div>
                    )}

                    {!arePostsLoading && posts.length > 0 && (
                        <div className="space-y-4">
                            {posts.map((post) => (
                                <PostCard key={post.id} post={post}/>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
export default CommunityDetailsPage;