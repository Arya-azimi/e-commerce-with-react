import {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
} from "react";
import { signIn, signUp, getCart, saveCart } from "../services";
import { useCartStore } from "../state/store";
import { User } from "../domain";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const authResult = await signIn(username, password);
      const newUser: User = { ...authResult, userId: authResult.userId };
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));

      const cartItems = await getCart(newUser.userId);
      if (cartItems) {
        useCartStore.getState().setCart(cartItems);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطا در ورود.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const authResult = await signUp(username, password);
      const newUser: User = { ...authResult, userId: authResult.userId };
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطا در ثبت‌نام.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    if (user) {
      saveCart(user.userId, useCartStore.getState().items);
    }
    useCartStore.getState().clearCart();
    setUser(null);
    localStorage.removeItem("user");
  };

  const value = { user, loading, error, login, signup, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
