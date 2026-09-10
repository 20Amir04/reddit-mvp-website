import { api } from "./axios";
import type { SearchResponse, SearchType } from "../types/search";

export async function searchContent(query: string, type: SearchType = "all") {
    const response = await api.get<SearchResponse>("/search", {
        params: {
            query,
            type,
        },
    });

    return response.data;
}