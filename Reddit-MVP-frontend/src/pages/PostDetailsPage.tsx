import { useParams } from "react-router-dom";

function PostDetailsPage() {
    const {postId} = useParams();

    return(
        <main className="mx-auto max-w-4xl px-3 py-6 sm:px-4 lg:px-6">
            <section className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
                <p className="text-sm font-semibold text-orange-400">Post #{postId}</p>
                
                <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                    Post Details
                </h1>

                <p className="mt-3 text-sm leading-6 text-neutral-400">
                    Full post, votes, comments, replies, and edit/delete actions will be
                    added here soon.
                </p>
            </section>
        </main>
    );
}
export default PostDetailsPage;