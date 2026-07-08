import { Link } from "react-router-dom";

function NotFoundPage() {
    return(
        <main className="mx-auto flex min-h-[calc(100vh-56px)] max-w-xl items-center px-4 py-10 text-center sm:min-h-[calc(100vh-64px)]">
            <section className="w-full rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 ">           
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">
                    404
                </p>

                <h1 className="mt-3 text-3xl font-bold text-white">
                    Page Not Found
                </h1>

                <p className="mt-3 text-sm leading-6 text-neutral-400">
                    The page you are looking for does not exist or was moved.
                </p>

                <Link
                    to="/"
                    className="mt-6 inline-flex rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
                >
                    Back to Home Page
                </Link>
            </section>
        </main>
    );
}
export default NotFoundPage;