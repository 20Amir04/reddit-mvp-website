function RegisterPage() {
    return(
        <main className="mx-auto flex min-h-[calc(100vh-56px)] max-w-md items-center px-4 py-10 sm:min-h-[calc(100vh-64px)]">
            <section className="w-full rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">
                    Join Reddit MVP
                </p>

                <h1 className="mt-3 text-3xl font-bold text-white">Create account</h1>
            
                <p className="mt-3 text-sm text-neutral-400">
                    Registration form will be implemented during the Auth phase.
                </p>
            </section>
        </main>
    );
}
export default RegisterPage;