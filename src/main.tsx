import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { useAuth } from "./hooks/";

export function Main() {
  const { initializeAuth } = useAuth();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <StrictMode>
      <App />
    </StrictMode>
  );
}

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(<Main />);
}
