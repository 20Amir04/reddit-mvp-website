import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import PostCard from "../components/PostCard";
import { getPosts } from "../api/postApi";
import type { Post } from "../types/post";

function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [sort, setSort] = useState("new");

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPosts() {
      try {
        setIsLoading(true);
        setError("");

        const data = await getPosts(sort);
        setPosts(data);
      } catch {
        setError("Failed to load posts.");
      } finally {
        setIsLoading(false);
      }
    }

    loadPosts();
  }, [sort]);

  return (
      <main className="mx-auto flex max-w-7xl gap-4 px-3 py-4 sm:px-4 sm:py-5 lg:gap-5 lg:px-6 xl:gap-6">
        <LeftSidebar/>

        <section className="min-w-0 flex-1">
          <div className="mb-4 rounded-2xl border border-white/10 bg-white/5 p-3 sm:p-4">
            <Link
              to="create-post"
              className="block w-full rounded-full border border-white/10 bg-white/10 px-4 py-2.5 text-left text-sm text-neutral-400 hover:border-orange-500 hover:bg-white/[0.12] sm:px-5 sm:py-3"
            >
              Create a post
            </Link>
          </div>

          <div className="mb-4 flex items-center gap-2 overflow-x-auto rounded-2xl border border-white/10 bg-white/5 p-2">
            <button 
              type="button"
              onClick={() => setSort("new")}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold ${
              sort === "new"
              ? "bg-white text-neutral-950"
              : "text-neutral-300 hover:bg-white/10"
            }`}
            >
              New
            </button>

            <button 
            type="button"
              onClick={() => setSort("popular")}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold ${
              sort === "popular"
              ? "bg-white text-neutral-950"
              : "text-neutral-300 hover:bg-white/10"
            }`}
            >
              Popular
            </button>
          </div>
          
          {isLoading && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-neutral-400">
              Loading posts...
            </div>
          )}

          {error && (
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-sm text-red-300">
              {error}
            </div>
          )}

          {!isLoading && !error && posts.length > 0 && (
            <div className="space-y-4">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}  
        </section>

        <RightSidebar/>
      </main>
  );
}
export default HomePage;