import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute() {
    const {isAuthenticated, isLoading} = useAuth();

    const location = useLocation();

    if (isLoading) {
        return (
            <main className="mx-auto flex min-h-[calc(100vh-56px)] max-w-xl items-center justify-center px-4 py-10 text-center sm:min-h-[calc(100vh-56px)]">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-neutral-300">
                    Checking authentication...
                </div>
            </main>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace state={{rom: location}} />;
    }

    return <Outlet/>;
}
export default ProtectedRoute;