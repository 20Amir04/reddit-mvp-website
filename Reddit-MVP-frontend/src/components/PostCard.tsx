import { ArrowDownIcon, ArrowUpIcon, ChatBubbleOvalLeftIcon, BookmarkIcon, ShareIcon} from "@heroicons/react/24/outline";
import type { Post } from "../types/post";

type PostCardProps = {
    post: Post;
};

function PostCard({post}: PostCardProps) {
    return(
        <article className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:border-white/20 hover:bg-white/[0.07]">
            <div className="sm:flex">
                <div className="hidden w-14 shrink-0 flex-col items-center gap-2 border-r border-white/10 bg-black/20 py-4 sm:flex">
                    <button className="text-neutral-400 hover:text-orange-500">
                        <ArrowUpIcon className="h-5 w-5" />
                    </button>

                    <span className="text-sm font-bold text-white">{post.voteScore}</span>

                    <button className="text-neutral-400 hover:text-blue-400">
                        <ArrowDownIcon className="h-5 w-5" />
                    </button>
                </div>

                <div className="flex-1 p-4 sm:p-5">
                    <div className="mb-3 flex items-center justify-between gap-3 sm:hidden">
                        <div className="flex items-center gap-2 rounded-full bg-black/20 px-3 py-1.5">
                            <button className="text-neutral-400 hover:text-orange-500">
                                <ArrowUpIcon className="h-4 w-4"/>
                            </button>

                            <span className="text-sm font-bold text-white">
                                {post.voteScore}
                            </span>

                            <button className="text-neutral-400 hover:text-blue-400">
                                <ArrowDownIcon className="h-4 w-4" />
                            </button>
                        </div>

                        {post.tag && (
                            <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-400">
                                {post.tag}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs" text-neutral-400>
                        <span className="font-semibold text-neutral-200">
                            r/{post.communityName}
                        </span>
                        <span>•</span>
                        <span>{post.createdAt}</span>
                    </div>

                    <h2 className="mt-3 text-lg font-bold leading-snug text-white sm:text-xl">
                        {post.title}
                    </h2>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-neutral-300 sm:text-[15px]">
                        {post.content}
                    </p>

                    {post.tag && (
                        <span className="mt-4 hidden rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-400 sm:inline-flex">
                            {post.tag}
                        </span>
                    )}

                    <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-neutral-400 sm:gap-3">
                        <button className="flex items-center gap-1.5 rounded-full px-3 py-1.5 hover:bg-white/10">
                            <ChatBubbleOvalLeftIcon className="h-4 w-4" />
                            <span>{post.commentsCount} comments</span>
                        </button>

                        <button className="flex items-center gap-1.5 rounded-full px-3 py-1.5 hover:bg-white/10">
                            <ShareIcon className="h-4 w-4" />
                            <span>Share</span>
                        </button>

                        <button className="flex items-center gap-1.5 rounded-full px-3 py-1.5 hover:bg-white/10">
                            <BookmarkIcon className="h-4 w-4" />
                            <span>Save</span>
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
}
export default PostCard;