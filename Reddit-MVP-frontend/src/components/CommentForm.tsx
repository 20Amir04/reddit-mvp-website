import { useState } from "react";
import type { FormEvent } from "react";

type CommentFormProps = {
    placeholder?: string;
    buttonText?: string;
    initialValue?: string;
    isSubmitting?: boolean;
    onSubmit: (content: string) => Promise<void>;
    onCancel?: () => void;
};

function CommentForm({
    placeholder = "Write a comment...",
    buttonText = "Comment",
    initialValue = "",
    isSubmitting = false,
    onSubmit,
    onCancel,
}: CommentFormProps) {
    const [content, setContent] = useState(initialValue);
    const [error, setError] = useState("");

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setError("");

        const trimmedContent = content.trim();

        if (!trimmedContent) {
            setError("Comment content is required.");
            return;
        }

        if (trimmedContent.length > 3000) {
            setError("Comment cannot exceed 3000 characters.");
            return;
        }

        await onSubmit(trimmedContent);

        if (!initialValue) {
            setContent("");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <textarea 
                value={content}
                onChange={(event) => setContent(event.target.value)}
                placeholder={placeholder}
                rows={4}
                className="w-full resize-none rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-neutral-500 focus:border-orange-500"
            />

            {error && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                    {error}
                </div>
            )}

            <div className="flex flex-wrap gap-2">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isSubmitting ? "Submitting..." : buttonText}
                </button>

                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="rounded-full border border-white/10 px-5 py-2 text-sm font-semibold text-neutral-200 hover:bg-white/10"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}

export default CommentForm;