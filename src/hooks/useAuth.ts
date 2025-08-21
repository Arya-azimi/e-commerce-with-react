import { create } from "zustand";
import { signIn, signUp, getCart, saveCart } from "../services/";
import { useCartStore } from "../state/store";

interface User {
  username: string;
  token: string;
  userId: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, password: string) => Promise<void>;
  logout: () => void;
  initializeAuth: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,

  initializeAuth: () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        set({ user: parsedUser, loading: false, error: null });
        // Load the cart for the logged-in user
        getCart(parsedUser.userId).then((items) => {
          if (items) {
            useCartStore.getState().setCart(items);
          }
        });
      } else {
        set({ user: null, loading: false, error: null });
      }
    } catch (e) {
      console.log(e);
      set({
        user: null,
        loading: false,
        error: "Failed to load user from local storage",
      });
    }
  },

  login: async (username, password) => {
    set({ loading: true, error: null });
    try {
      const authResult = await signIn(username, password);
      const newUser: User = {
        username: authResult.username,
        token: authResult.token,
        userId: authResult.userId,
      };
      localStorage.setItem("user", JSON.stringify(newUser));
      set({ user: newUser, loading: false, error: null });

      // Load cart after successful login
      const cartItems = await getCart(newUser.userId);
      if (cartItems) {
        useCartStore.getState().setCart(cartItems);
      }
    } catch (error) {
      console.error("Login failed:", error);
      set({ user: null, loading: false, error: "Login failed" });
      throw error;
    }
  },

  signup: async (username, password) => {
    set({ loading: true, error: null });
    try {
      const authResult = await signUp(username, password);
      const newUser: User = {
        username: authResult.username,
        token: authResult.token,
        userId: authResult.userId,
      };
      localStorage.setItem("user", JSON.stringify(newUser));
      set({ user: newUser, loading: false, error: null });
    } catch (error) {
      console.error("Sign up failed:", error);
      set({ user: null, loading: false, error: "Sign up failed" });
      throw error;
    }
  },

  logout: () => {
    const { user } = useAuth.getState();
    if (user) {
      // Save cart before logging out
      const cartItems = useCartStore.getState().items;
      saveCart(user.userId, cartItems);
    }
    useCartStore.getState().clearCart();
    localStorage.removeItem("user");
    set({ user: null, loading: false, error: null });
  },
}));
