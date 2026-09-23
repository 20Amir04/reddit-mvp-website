import { api } from "./axios";

export type UpdateEmailRequest = {
    newEmail: string;
};

export type UpdateEmailResponse = {
    message: string;
    email:string;
};

export type UpdatePasswordRequest = {
    currentPassword: string;
    newPassword: string;
};

export type UpdatePasswordResponse = {
    message: string;
};

export async function updateEmail(data: UpdateEmailRequest) {
    const response = await api.put<UpdateEmailResponse>("/account/email", data);
    
    return response.data;
}

export async function updatePassword(data: UpdatePasswordRequest) {
    const response = await api.put<UpdatePasswordResponse>("/account/password", data);
    
    return response.data;
}