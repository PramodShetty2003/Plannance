import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { ThemeProvider } from "@/components/themeProvider";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <App />
      <Toaster richColors position="top-right" closeButton />
    </ThemeProvider>
  </React.StrictMode>
);
