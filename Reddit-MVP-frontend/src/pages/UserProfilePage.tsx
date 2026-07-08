import { useParams } from "react-router-dom";

function UserProfilePage() {
    const {username} = useParams();

    return(
        <main className="mx-auto max-w-5xl px-3 py-6 sm:px-4 lg:px-6">
            <section className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
                <p className="text-sm font-semibold text-orange-400">u/{username}</p>
                
                <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                    User Profile
                </h1>

                <p className="mt-3 text-sm leading-6 text-neutral-400">
                    User posts, comments, karma, and profile information will be added
                    here soon.
                </p>
            </section>
        </main>
    );
}
export default UserProfilePage;