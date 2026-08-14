import { api } from "./axios";
import type { AuthResponse, LoginRequest, RegisterRequest } from "../types/auth";

export async function registerUser(data:RegisterRequest) {
    const response = await api.post<AuthResponse>("/auth/register", data);
    return response.data;
}

export async function loginUser(data:LoginRequest) {
    const response = await api.post<AuthResponse>("/auth/login", data);
    return response.data;
}

export async function getCurrentUser() {
    const response = await api.get("/auth/me");
    return response.data;
}