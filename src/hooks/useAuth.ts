import { useState, useEffect } from "react";

interface User {
  username: string;
  token: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (username: string) => {
    const mockToken = `mock-token-${Date.now()}`;
    const newUser: User = { username, token: mockToken };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return { user, login, logout };
}
