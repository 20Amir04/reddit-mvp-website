import { useEffect, useMemo, useState} from "react";
import { Link } from "react-router-dom";
import { getCommunities, joinCommunity, leaveCommunity } from "../api/communityApi";
import type { Community } from "../types/community";
import { useAuth } from "../context/AuthContext";


function CommunitiesPage() {
    const {isAuthenticated} = useAuth();

    const [communities, setCommunities] = useState<Community[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    const [isLoading, SetIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [actionMessage, setActionMessage] = useState("");

    useEffect(() => {
        async function loadCommunities() {
            try {
                SetIsLoading(true);
                setError("");

                const data = await getCommunities();
                setCommunities(data);
            } catch {
                setError("Failed to load communities.");
            } finally {
                SetIsLoading(false);
            }
        }

        loadCommunities();
    }, []);

    const filteredCommunities = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        if (!query) {
            return communities;
        }

        return communities.filter(
            (community) =>
                community.name.toLowerCase().includes(query) ||
                community.description.toLowerCase().includes(query)
        );
    }, [communities, searchQuery]);

    async function handleJoinCommunity(communityId: number) {
        setActionMessage("");
        setError("");

        if (!isAuthenticated) {
            setError("You need to log in to join a community.");
            return;
        }

        try {
            const response = await joinCommunity(communityId);

            setActionMessage(response.message);

            setCommunities((currentCommunities) => 
                currentCommunities.map((community) => 
                community.id === communityId
            ? {
                ...community,
                isMember: true,
                membersCount: community.membersCount + 1,
                }
                : community
                )
            );
        } catch (error: any) {
            const message = error.response?.data?.message ?? "Failed to join community.";

            setError(message);
        }
    }

    async function handleLeaveCommunity(communityId: number) {
        setActionMessage("");
        setError("");

        try {
            const response = await leaveCommunity(communityId);

            setActionMessage(response.message);

            setCommunities((currentCommunities) => 
                currentCommunities.map((community) => 
                community.id === communityId
            ? {
                ...community,
                isMember: false,
                membersCount: community.membersCount - 1,
                }
                : community
                )
            );
        } catch (error: any) {
            const message = error.response?.data?.message ?? "Failed to join community.";

            setError(message);
        }
    }
    
    return(
        <main className="mx-auto max-w-5xl px-3 py-6 sm:px-4 lg:px-6">
            <section className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-white sm:text-3xl">
                            Explore Communities
                        </h1>
            
                        <p className="mt-3 text-sm leading-6 text-neutral-400">
                            Find communities, explore discussions, and join spaces that match your interests.
                        </p>
                    </div>

                    <Link
                        to="/create-community"
                        className="inline-flex shrink-0 items-center justify-center rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
                    >
                        Create Community
                    </Link>
                </div>
                
                <div className="mt-6">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        placeholder="Search communities"
                        className="w-full rounded-full border border-white/10 bg-white-10 px-5 py-3 text-sm text-white outline-none placeholder:text-neutral-500 focus:border-orange-500"
                    />
                </div>

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
            </section>

            <section className="mt-5 space-y-4">
                {isLoading && (
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-neutral-400">
                        Loading communities...
                    </div>
                )}

                {!isLoading && filteredCommunities.length === 0 && (
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-neutral-400">
                        No communities found.
                    </div>
                )}

                {!isLoading &&
                filteredCommunities.map((community) => (
                    <article
                        key={community.id}
                        className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-white/20 hover:bg-white/[0.07]"
                    >
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div className="min-w-0">
                                <Link
                                    to={`/r/${community.name}`}
                                    className="text-xl font-bold text-white hover:text-orange-400"
                                >
                                    r/{community.name}
                                </Link>

                                <p className="mt-2 line-clamp-2 text-sm leading-6 text-neutral-400">
                                    {community.description}
                                </p>

                                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-500">
                                    <span>{community.membersCount} members</span>
                                    <span>Created by u/{community.creatorUsername}</span>
                                </div>
                            </div>
                            
                            {community.isMember ? (
                                <button
                                    type="button"
                                    onClick={() => handleLeaveCommunity(community.id)}
                                    className="shrink-0 rounded-full bg-white px-5 py-2 text-sm font-semibold text-neutral-950 hover:bg-neutral-200"
                                >
                                    Leave
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => handleJoinCommunity(community.id)}
                                    className="shrink-0 rounded-full bg-white px-5 py-2 text-sm font-semibold text-neutral-950 hover:bg-neutral-200"
                                >
                                    Join
                                </button>
                            )}
                            
                        </div>
                    </article>
                ))}
            </section>
        </main>
    );
}
export default CommunitiesPage;