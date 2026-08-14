export type AuthUser = {
    id: string;
    username: string;
    email: string;
    createdAt: string;
};

export type RegisterRequest = {
    username: string;
    email: string;
    password: string;
};

export type LoginRequest = {
    login: string;
    password: string;
};

export type AuthResponse = {
    message: string;
    token: string;
    user: AuthUser;
};