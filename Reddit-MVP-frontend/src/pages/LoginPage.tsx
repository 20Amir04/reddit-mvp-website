import {useState } from "react";
import type { FormEvent } from "react";
import {Link, useNavigate} from "react-router-dom"
import { useAuth } from "../context/AuthContext";

function LoginPage() {

    const navigate = useNavigate();
    const {login: loginWithCredentials} = useAuth();
    
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [isSubmitting, SetIsSubmitting] = useState(false);

    async function handleSubmit(event:FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setError("");

        if (!login.trim() || !password.trim()) {
            setError("Please enter your username/email and password.");
            return;
        }

        try {
            SetIsSubmitting(true);

            await loginWithCredentials({
                login,
                password
            });
            navigate("/");  
        } catch (error: any) {
            const message = 
                error.response?.data?.message ?? "Login failed. Please try again.";

            setError(message);
        } finally {
            SetIsSubmitting(false);
        }
    }

    return(
        <main className="mx-auto flex min-h-[calc(100vh-56px)] max-w-md items-center px-4 py-10 sm:min-h-[calc(100vh-64px)]">
            <section className="w-full rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">
                    Welcome back!
                </p>

                <h1 className="mt-3 text-3xl font-bold text-white">Log in</h1>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div>
                        <label className="text-sm font-medium text-neutral-300">
                            Username or email
                        </label>

                        <input
                            type="text"
                            value={login}
                            onChange={(event) => setLogin(event.target.value)}
                            className="mt-2 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-neutral-500 focus:border-orange-500"
                            placeholder="amir/amir@gmail.com"
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
                        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                       {isSubmitting ? "Login in..." : "Login in"}     
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-neutral-400">
                    Don`t have an account?{" "}
                    <Link to="/register" className="font-semibold text-orange-400">
                        Sign Up
                    </Link>
                </p>
            </section>
        </main>
    );
}
export default LoginPage;