import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./router/router";
import { RouterProvider } from "react-router-dom";
import LanguageService from "./services/LanguageService";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LanguageService>
      <RouterProvider router={router} />
    </LanguageService>
  </StrictMode>,
);
