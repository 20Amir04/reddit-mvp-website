import { useSearchParams } from "react-router-dom";

function SearchResultsPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") ?? "";

    return(
        <main className="mx-auto max-w-5xl px-3 py-6 sm:px-4 lg:px-6">
            <section className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">           
                <h1 className="text-2xl font-bold text-white sm:text-3xl">
                    Search Results
                </h1>

                <p className="mt-3 text-sm leading-6 text-neutral-400">
                    Showing results for:{" "}
                    <span className="font-semibold text-orange-400">
                        {query || "empty query"}
                    </span>
                </p>

                <div className="mt-5 flex gap-2">
                    <button className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-neutral-950">
                        Posts
                    </button>

                    <button className="rounded-full px-4 py-2 text-sm font-semibold text-neutral-300 hover:bg-white/10">
                        Communities
                    </button>
                </div>
            </section>
        </main>
    );
}
export default SearchResultsPage;