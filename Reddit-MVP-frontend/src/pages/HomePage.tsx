import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import PostCard from "../components/PostCard";
import { mockPosts } from "../data/mockPost";

function HomePage() {
  return (
      <main className="mx-auto flex max-w-7xl gap-4 px-3 py-4 sm:px-4 sm:py-5 lg:gap-5 lg:px-6 xl:gap-6">
        <LeftSidebar/>

        <section className="min-w-0 flex-1">
          <div className="mb-4 rounded-2xl border border-white/10 bg-white/5 p-3 sm:p-4">
            <button className="w-full rounded-full border border-white/10 bg-white/10 px-4 py-2.5 text-left text-sm text-neutral-400 hover:border-orange-500 hover:bg-white/[0.12] sm:px-5 sm:py-3">
              Create a post
            </button>
          </div>

          <div className="mb-4 flex items-center gap-2 overflow-x-auto rounded-2xl border border-white/10 bg-white/5 p-2">
            <button className="shrink-0 rounded-full bg-white px-4 py-2 text-sm font-semibold text-neutral-950">
              New
            </button>

            <button className="shrink-0 rounded-full px-4 py-2 text-sm font-semibold text-neutral-300 hover:bg-white/10">
              Popular
            </button>

            <button className="shrink-0 rounded-full px-4 py-2 text-sm font-semibold text-neutral-300 hover:bg-white/10">
              Hot
            </button>
          </div>

          <div className="space-y-4">
            {mockPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>

        <RightSidebar/>
      </main>
  );
}
export default HomePage;