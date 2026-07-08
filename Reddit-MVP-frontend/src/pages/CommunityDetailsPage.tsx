import { useParams } from "react-router-dom";

function CommunityDetailsPage() {
    const {communityName} = useParams();

    return(
        <main className="mx-auto max-w-6xl px-3 py-6 sm:px-4 lg:px-6">
            <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                <div className="h-32 bg-gradient-to-r from-orange-500/70 to-orange-900/40 sm:h-40"/>

                <div className="p-5 sm:p-6">
                    <p className="text-sm font-semibold text-orange-400">
                        r/{communityName}
                    </p>

                    <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                        Community Details
                    </h1>

                    <p className="mt-3 text-sm leading-6 text-neutral-400">
                        Banner, description, members count, join/leave, sorting, and community posts will be added here soon.
                    </p>
                </div>
            </section>
        </main>
    );
}
export default CommunityDetailsPage;