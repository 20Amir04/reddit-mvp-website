import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { createCommunity } from "../api/communityApi";

function CreateCommunityPage() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [bannerImageUrl, setBannerImageUrl] = useState("");

    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setError("");

        const trimmedName = name.trim().toLowerCase();
        const trimmedDescription = description.trim();

        if (!trimmedName || !trimmedDescription) {
            setError("Community name and description are required.");
            return;
        }

        if (trimmedName.length < 3 || trimmedName.length > 50) {
            setError("Community name must be between 3 and 50 characters.");
            return;
        }

        try {
            setIsSubmitting(true);

            const response = await createCommunity({
                name: trimmedName,
                description: trimmedDescription,
                bannerImageUrl: bannerImageUrl.trim() || null,
            });

            navigate(`/r/${response.community.name}`);
        } catch (error: any) {
            const message = error.response?.data?.message ?? "Failed to create community.";

            setError(message);
        } finally {
            setIsSubmitting(false);
        }
    }

    return(
        <main className="mx-auto max-w-2xl px-3 py-6 sm:px-4 lg:px-6">
            <section className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">
                    New community
                </p>
                
                <h1 className="mt 3 text-2xl font-bold text-white sm:text-3xl">
                    Create Community
                </h1>

                <p className="mt-3 text-sm leading-6 text-neutral-400">
                    Create a space where people can post, comment, and discuss a shared
                    topic.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div>
                        <label className="text-sm font-medium text-neutral-300">
                            Community name
                        </label>

                        <div className="mt-2 flex rounded-xl border border-white/10 bg-white/10 focus-within:border-orange-500">
                            <span className="flex items-center pl-4 rext-sm text-neutral-500">
                                r/
                            </span>

                            <input
                                type="text"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                placeholder="dotnet"
                                className="min-w-0 flex-1 bg-transparent px-2 py-3 text-sm text-white outline-none placeholder:text-neutral-500"
                            />
                        </div>

                        <p className="mt-2 text-xs text-neutral-500">
                            Use 3-50 characters. Keep it simple and URL-friendly.
                        </p>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-neutral-300">
                            Description
                        </label>

                        <textarea
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            placeholder="What is this community about?"
                            rows={5}
                            className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white-10 px-4 py-3 text-sm text-white outline-none  placeholder:text-neutral-500 focus:border-orange-500"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-neutral-300">
                            Banner Image URL
                        </label>

                        <input
                            type="text"
                            value={bannerImageUrl}
                            onChange={(event) => setBannerImageUrl(event.target.value)}
                            placeholder="Optional"
                            className="mt-2 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-neutral-500 focus:border-orange-500"
                         /> 
                    </div>  

                    {error && (
                        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isSubmitting ? "Creating..." : "Create Community"}
                    </button>
                </form>
            </section>
        </main>
    );
}
export default CreateCommunityPage;