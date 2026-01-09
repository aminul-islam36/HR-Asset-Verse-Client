import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router/dom";
import AuthProvider from "./AllContexts/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import router from "./Routes/Route.jsx";
import "aos/dist/aos.css";
import Aos from "aos";
const queryClient = new QueryClient();

Aos.init({
  duration: 800,
  easing: "ease-in-out",
  once: false,
  mirror: true,
  offset: 100,
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
