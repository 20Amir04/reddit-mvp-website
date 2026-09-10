import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { searchContent } from "../api/searchApi";
import PostCard from "../components/PostCard";
import type { Community } from "../types/community";
import type { Post } from "../types/post";
import type { SearchType } from "../types/search";

function SearchResultsPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    
    const query = searchParams.get("q") ?? "";
    const typeParam = searchParams.get("type") ?? "all";

    const searchType: SearchType =
        typeParam === "posts" || typeParam === "communities" ? typeParam : "all";

    const [posts, setPosts] = useState<Post[]>([]);
    const [communities, setCommunities] = useState<Community[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadSearchResults() {
            const trimmedQuery = query.trim();

            if (!trimmedQuery) {
                setPosts([]);
                setCommunities([]);
                return;
            }

            try {
                setIsLoading(true);
                setError("");

                const data = await searchContent(trimmedQuery, searchType);

                setPosts(Array.isArray(data.posts) ? data.posts : []);  
                setCommunities(Array.isArray(data.communities) ? data.communities : []);
            } catch (error: any) {
                const message = 
                    error.response?.data?.message ?? "Failed to load search results.";

                    setError(message);
            } finally {
                setIsLoading(false);
            }
        }

        loadSearchResults();
    }, [query, searchType]);

    function changeType(nextType: SearchType) {
        setSearchParams({
            q: query,
            type: nextType,
        });
    }

    const hasResults = posts.length > 0 || communities.length > 0;

    return(
        <main className="mx-auto max-w-5xl px-3 py-6 sm:px-4 lg:px-6">
            <section className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">           
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">
                    Search
                </p>
                
                <h1 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                    Search Results
                </h1>

                <p className="mt-3 text-sm leading-6 text-neutral-400">
                    Results for:{" "}
                    <span className="font-semibold text-neutral-200">
                        {query.trim() || "nothing"}
                    </span>
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                    <button 
                        type="button"
                        onClick={() => changeType("all")}
                        className={`rounded-full bg-white px-4 py-2 text-sm font-semibold ${ 
                            searchType === "all"
                            ? "bg-white text-neutral-950"
                            : "border border-white/10 text-neutral-400 hover:bg-white/10"}`}
                    >
                        All
                    </button>

                    <button 
                        type="button"
                        onClick={() => changeType("posts")}
                        className={`rounded-full bg-white px-4 py-2 text-sm font-semibold ${ 
                            searchType === "posts"
                            ? "bg-white text-neutral-950"
                            : "border border-white/10 text-neutral-400 hover:bg-white/10"}`}
                    >
                        Posts
                    </button>

                    <button 
                        type="button"
                        onClick={() => changeType("communities")}
                        className={`rounded-full bg-white px-4 py-2 text-sm font-semibold ${ 
                            searchType === "communities"
                            ? "bg-white text-neutral-950"
                            : "border border-white/10 text-neutral-400 hover:bg-white/10"}`}
                    >
                        Communities
                    </button>
                </div>
            </section>

            {isLoading && (
                <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-neutral-400">
                    Loading search results...
                </div>
            )}

            {error && (
                <div className="mt-5 rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-sm rext-red-300">
                    {error}
                </div>
            )}

            {!isLoading && !error && !query.trim() && (
                <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-neutral-400">
                    Type something in the search bar to find posts and communities.
                </div>
            )}

            {!isLoading && !error && query.trim() && !hasResults && (
                <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-neutral-400">
                    No results found.
                </div>
            )}

            {!isLoading && !error && communities.length > 0 && (
                <section className="mt-5">
                    <div className="mb-4 rounded-2xl border border-white/10 bg-white/5 p-5">
                        <h2 className="text-xl font-bold text-white">Communities</h2>
                    </div>

                    <div className="space-y-4">
                        {communities.map((community) => (
                            <article
                                key={community.id}
                                className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-white/20 hover:bg-white/[0.07]"
                            >
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                    <div>
                                        <Link
                                            to={`/r/${community.name}`}
                                            className="text-xl font-bold text-white hover:text-orange-400"
                                        >
                                            r/{community.name}
                                        </Link>

                                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-neutral-400">
                                            {community.description}
                                        </p>

                                        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-neutral-500">
                                            <span>{community.membersCount} members</span>
                                            <span>Created by u/{community.creatorUsername}</span>
                                        </div>
                                    </div>

                                    <Link
                                        to={`/r/${community.name}`}
                                        className="shrink-0 rounded-full bg-white px-5 py-2 text-sm font-semibold text-neutral-950 hover:bg-neutral-200"
                                    >
                                        View
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            )}

            {!isLoading && !error && posts.length > 0 && (
                <section className="mt-5">
                    <div className="mb-4 rounded-2xl border border-white/10 bg-white/5 p-5">
                        <h2 className="text-xl font-bold text-white">Posts</h2>
                    </div>

                    <div className="space-y-4">
                        {posts.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
}
export default SearchResultsPage;