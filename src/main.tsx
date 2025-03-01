import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";
import { AuthProvider } from "./auth/auth-provider";
import "./i18n/config";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
