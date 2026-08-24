import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { getCommunities } from "../api/communityApi";
import { createPost } from "../api/postApi";
import type { Community } from "../types/community";

function CreatePostPage() {
    const navigate = useNavigate();

    const [communities, setCommunities] = useState<Community[]>([]);
    const [communityId, setCommunityId] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const [isLoadingCommunities, setIsLoadingCommunities] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadCommunities() {
            try {
                setIsLoadingCommunities(true);

                const data = await getCommunities();
                setCommunities(data);

                if (data.length > 0) {
                    setCommunityId(String(data[0].id));
                }
            } catch {
                setError("Failed to load communities.");
            } finally {
                setIsLoadingCommunities(false);
            }
        }

        loadCommunities();
    }, []);

    async function  handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setError("");

        const selectedCommunityId = Number(communityId);
        const trimmedTitle = title.trim();
        const trimmedContent = content.trim();

        if (!selectedCommunityId) {
            setError("Please choose a community.");
            return;
        }

        if (!trimmedTitle) {
            setError("Post content is required.");
            return;
        }

        try {
            setIsSubmitting(true);

            const response = await createPost({
                communityId: selectedCommunityId,
                title: trimmedTitle,
                content: trimmedContent,
                imageUrl: imageUrl.trim() || null,
            });

            navigate(`/post/${response.post.id}`);
        } catch (error: any) {
            const message = 
                error.response?.data?.message ?? "Failed to create post.";

            setError(message);
        } finally {
            setIsSubmitting(false);
        }
    }

    return(
        <main className="mx-auto max-w-3xl px-3 py-6 sm:px-4 lg:px-6">
            <section className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">
                    New post
                </p>
                
                <h1 className="text-2xl font-bold text-white sm:text-3xl">
                    Create Post
                </h1>

                <p className="mt-3 text-sm leading-6 text-neutral-400">
                     Share a question, idea, update, or discussion with a community.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div>
                        <label className="text-sm font-medium text-neutral-300">
                            Community
                        </label>

                        <select
                            value={communityId}
                            onChange={(event) => setCommunityId(event.target.value)}
                            disabled={isLoadingCommunities}
                            className="mt-2 w-full rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-sm text-white outline-none focus:border-orange-500 disabled:opacity-60"
                        >
                            {communities.map((community => (
                                <option key={community.id} value={community.id}>
                                    r/{community.name}
                                </option>
                            )))}
                        </select>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-neutral-300">
                            Title
                        </label>

                        <input
                            type="text"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            placeholder="Post title"
                            className="mt-2 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-neutral-500 focus:border-orange-500"    
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-neutral-300">
                            Content
                        </label>

                        <textarea
                            value={content}
                            onChange={(event) => setContent(event.target.value)}
                            placeholder="Write your post..."
                            rows={7}
                            className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-neutral-500 focus:border-orange-500"
                        />
                    </div>
            
                    <div>
                        <label className="text-sm font-medium text-neutral-300">
                            Image URL
                        </label>

                        <input
                            type="text"
                            value={imageUrl}
                            onChange={(event) => setImageUrl(event.target.value)}
                            placeholder="Optional image URL"
                            className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-neutral-500 focus:border-orange-500"
                        />
                    </div>

                    {error && (
                        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting || isLoadingCommunities}
                        className="w-full rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isSubmitting ? "Creating post..." : "Create post"}
                    </button>
                </form>
            </section>
        </main>
    );
}
export default CreatePostPage;