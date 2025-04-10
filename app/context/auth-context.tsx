import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/router";
import { User, LoginCredentials, SignupData } from "../types";
import { authService } from "../services/auth.service";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setUser(JSON.parse(userData));
    }

    setLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setLoading(true);
    try {
      const { user, token } = await authService.login(credentials);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (data: SignupData) => {
    setLoading(true);
    try {
      const { user, token } = await authService.signup(data);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      router.push("/dashboard");
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
