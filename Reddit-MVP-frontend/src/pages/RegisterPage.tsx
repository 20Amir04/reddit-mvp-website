import {useState} from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RegisterPage() {
    const navigate = useNavigate();

    const {register} = useAuth();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isSubmitting, SetIsSubmitting] = useState(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        

        setError("");
        setSuccess("");

        if (!username.trim() || !email.trim() || !password.trim()) {
            setError("  Pleace fill in all fields.");
            return;
        }

        try {
            SetIsSubmitting(true);

            await register({
                username,
                email,
                password,
            });

            setSuccess("Account created successfully, Redirecting to login...");

            setTimeout(() => {
                navigate("/login");
            }, 800);
        } catch (error: any) {
            const message = 
                error.response?.data?.message ?? "Registration failed. Pleace try again.";

            const errors = error.response?.data?.errors;

            if (Array.isArray(errors)) {
                setError(errors.join(" "));
            } else {
                setError(message);
            }
        } finally {
            SetIsSubmitting(false);
        }
    }

    return(
        <main className="mx-auto flex min-h-[calc(100vh-56px)] max-w-md items-center px-4 py-10 sm:min-h-[calc(100vh-64px)]">
            <section className="w-full rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">
                    Join Reddit MVP
                </p>

                <h1 className="mt-3 text-3xl font-bold text-white">Create account</h1>
            
                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div>
                        <label className="text-sm font-medium text-neutral-300">
                            Username
                        </label>

                        <input
                            type="text"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            className="mt-2 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-neutral-500 focus:border-orange-500"
                            placeholder="Amir"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-neutral-300">
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            className="mt-2 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-neutral-500 focus:border-orange-500"
                            placeholder="amir@test.com"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-neutral-300">
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            className="mt-2 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-neutral-500 focus:border-orange-500"
                            placeholder="•••••••••"
                        />
                    </div>

                    {error && (
                        <div className="rounded-xl border border-red-500/300 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="rounded-xl border border-green-500/300 bg-green-500/10 px-4 py-3 text-sm text-green-300">
                            {success}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isSubmitting ? "Creating account..." : "Create account"}    
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-neutral-400">
                    Already have an account?{" "}
                    <Link to="/Login" className="font-semibold text-orange-400">
                        Login in
                    </Link>
                </p>
            </section>
        </main>
    );
}
export default RegisterPage;