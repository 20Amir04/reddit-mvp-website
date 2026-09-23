import React, { useState } from "react";
import { Link } from "react-router-dom";
import { updateEmail, updatePassword } from "../api/accountApi";
import { useAuth } from "../context/AuthContext";

function SettingsPage() {
    const {user, isAuthenticated} = useAuth();

    const [newEmail, setNewEmail] = useState(user?.email ?? "");
    const [emailMessage, setEmailMessage] = useState("");
    const [emailError, setEmailError] = useState("");
    const [isUpdatindEmail, setIsUpdatingEmail] = useState(false);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [isUpdatindPassword, setIsUpdatingPassword] = useState(false);

    async function handleEmailSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const trimmedEmail = newEmail.trim();

        setEmailMessage("");
        setEmailError("");

        if (!trimmedEmail) {
            setEmailError("Email is required");
            return;
        }

        try {
            setIsUpdatingEmail(true);

            const response = await updateEmail({
                newEmail: trimmedEmail,
            });

            setEmailMessage(`${response.message}. Refresh the page to update account info.`);
            setNewEmail(response.email);
        } catch (error: any) {
            const message =
                error.response?.data?.message ?? "Failed to update email.";
            
            setEmailError(message);
        } finally {
            setIsUpdatingEmail(false);
        }
    }

    async function handlePasswordSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setPasswordMessage("");
        setPasswordError("");

        if (!currentPassword.trim()) {
            setPasswordError("Current password is required.");
            return;
        }

        if (!newPassword.trim()) {
            setPasswordError("New password is required.");
            return;
        }

        if (newPassword.length < 6) {
            setPasswordError("New password must be at least 6 characters.");
            return;
        }

        try {
            setIsUpdatingPassword(true);

            const response = await updatePassword({
                currentPassword,
                newPassword,
            });

            setPasswordMessage(response.message);
            setCurrentPassword("");
            setNewPassword("");
        } catch (error: any) {
            const errors = error.response?.data?.errors;

            const message = Array.isArray(errors) && errors.length > 0
                ? errors.join(" ")
                : error.response?.data?.message ?? "Failed to update password.";

            setPasswordError(message);
        } finally {
            setIsUpdatingPassword(false);
        }
    }

    if (!isAuthenticated) {
        return(
            <main className="mx-auto max-w-4xl px-3 py-6 sm:px-4 lg:px-6">
                <section className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
                    <h1 className="text-2xl font-bold text-white">
                        Settings
                    </h1>

                    <p className="mt-3 text-sm text-neutral-400">
                        Log in to manage your account settings.
                    </p>

                    <Link
                        to="/login"
                        className="mt-5 inline-flex rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
                    >
                        Log In
                    </Link>
                </section>
            </main>
        );
    }

    return(
        <main className="mx-auto max-w-4xl px-3 py-6 sm:px-4 lg:px-6">
            <section className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">
                    Account
                </p>

                <h1 className="mt-3 text-2xl font-bold text-white sm:text-3xl"> 
                    Settings
                </h1>

                <p className="mt-3 text-sm leading-6 text-neutral-400">
                    Manage your email and password.
                </p>
            </section>

            <section className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
                <h2 className="text-xl font-bold text-white">Change Email</h2>

                <p className="mt-2 text-sm text-neutral-400">
                    Current account:{" "}
                    <span className="font-medium text-neutral-200">
                        u/{user?.username}
                    </span>
                </p>

                <form
                    onSubmit={handleEmailSubmit}
                    className="mt-5 space-y-4"
                >
                    <div>
                        <label className="text-sm font-medium text-neutral-300">
                            New Email
                        </label>

                        <input 
                            type="email"
                            value={newEmail}
                            onChange={(event) => setNewEmail(event.target.value)}
                            className="mt-2 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-neutral-500 focus:border-orange-500"
                            placeholder="new-email@example.com"
                        />
                    </div>

                    {emailError && (
                        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
                            {emailError}
                        </div>
                    )}

                    {emailMessage && (
                        <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-300">
                            {emailMessage}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isUpdatindEmail}
                        className="rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isUpdatindEmail ? "Saving..." : "Save Email"}
                    </button>
                </form>
            </section>

            <section className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
                <h2 className="text-xl font-bold text-white">Change password</h2>

                <p className="mt-2 text-sm text-neutral-400">
                    Use your current password to set a new one.
                </p>

                <form
                    onSubmit={handlePasswordSubmit}
                    className="mt-5 space-y-4"
                >
                    <div>
                        <label className="text-sm font-medium text-neutral-300">
                            Current password
                        </label>

                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(event) => setCurrentPassword(event.target.value)}
                            className="mt-2 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-neutral-500 focus:border-orange-500"
                            placeholder="Current password"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-neutral-300">
                            New password
                        </label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(event) => setNewPassword(event.target.value)}
                            className="mt-2 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-neutral-500 focus:border-orange-500"
                            placeholder="New password"
                        />
                    </div>

                    {passwordError && (
                        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
                            {passwordError}
                        </div>
                    )}

                    {passwordMessage && (
                        <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-300">
                            {passwordMessage}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isUpdatindPassword} 
                        className="rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isUpdatindPassword ? "Saving..." : "Save Password"}
                    </button>
                </form>
            </section>
        </main>
    );
}
export default SettingsPage;