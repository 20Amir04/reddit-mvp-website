import type { Post } from "./post";
import type { Community } from "./community";

export type SearchType = "all" | "posts" | "communities";

export type SearchResponse = {
    query: string;
    type: SearchType;
    posts: Post[];
    communities: Community[];
};