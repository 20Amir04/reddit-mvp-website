function CreatePostPage() {
    return(
        <main className="mx-auto max-w-3xl px-3 py-6 sm:px-4 lg:px-6">
            <section className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
                <h1 className="text-2xl font-bold text-white sm:text-3xl">
                    Create Post
                </h1>

                <p className="mt-3 text-sm leading-6 text-neutral-400">
                     Post creation form with community select, title, content, and image
                    upload will be added here.
                </p>
            </section>
        </main>
    );
}
export default CreatePostPage;