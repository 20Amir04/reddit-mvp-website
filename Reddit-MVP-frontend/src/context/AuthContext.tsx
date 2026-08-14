import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import { getCurrentUser, loginUser, registerUser } from "../api/authApi";
import type { AuthUser, LoginRequest, RegisterRequest } from "../types/auth";
import { getToken, removeToken, saveToken } from "../utils/tokenStorage";

type AuthContextValue = {
    user: AuthUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (data: LoginRequest) => Promise<void>;
    register: (data: RegisterRequest) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type AuthProviderProps = {
    children: ReactNode;
};

export function AuthProvider({children}: AuthProviderProps) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadCurrentUser() {
            const token = getToken();

            if (!token) {
                setIsLoading(false)
                return;
            }

            try {
                const currentUser = await getCurrentUser();
                setUser(currentUser);
            } catch {
                removeToken();
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        }   

        loadCurrentUser();
    }, []);

    async function login(data: LoginRequest) {
        const response = await loginUser(data);

        saveToken(response.token);
        setUser(response.user);
    }

    async function register(data: RegisterRequest) {
        await registerUser(data);      
    }

    function logout() {
        removeToken();
        setUser(null);
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: Boolean(user),
                isLoading,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return context;
}