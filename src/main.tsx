import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./i18n/config";
import "./index.css";

import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

const router = createRouter({ 
  routeTree,
  basepath: "/bitfinance"
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
