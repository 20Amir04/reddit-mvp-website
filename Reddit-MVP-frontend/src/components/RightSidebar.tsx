const communities = [
    {name: "dotnet", members: "128k"},
    {name: "reactjs", members: "420k"},
    {name: "webdev", members: "980k"},
    {name: "sqlserver", members: "72k"},
];

function RightSidebar() {
    return(
        <aside className="hidden w-72 shrink-0 xl:block 2xl:w-80">
            <div className="sticky top-20 space-y-4">
                <section className="rounded-2xl border border-white/10 bg-white/5 p-4 2xl:p-5">
                    <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 2xl:text-sm">
                        Popular Communities
                    </h2>

                    <div className="mt-4 space-y-3">
                        {communities.map((community) => (
                            <div
                                key={community.name}
                                className="flex items-center justify-between gap-3 rounded-xl p-2 hover:bg-white/10"
                            >
                                <div className="min-w-0">
                                    <p className="truncate font-semibold text-white">
                                        r/{community.name}
                                    </p>
                                    <p className="text-sm text-neutral-400">
                                        {community.members} members
                                    </p>
                                </div>

                                <button className="shrink-0 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-neutral-950 hover:bg-neutral-200 2xl:px-4">
                                    Join
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="rounded-2xl border border-white/10 bg-white/5 p-4 2xl:p-5">
                    <h2 className="font-bold text-white">Create your own community</h2>

                    <p className="mt-2 text-sm leading-6 text-neutral-400">
                        Start a space for discussions, posts, and shared interests.
                    </p>

                    <button className="mt-4 w-full rounded-full bg-orange-500 py-2 text-sm font-semibold text-white hover:bg-orange-600">

                    </button>

                </section>
            </div>
        </aside>
    );
}
export default RightSidebar;