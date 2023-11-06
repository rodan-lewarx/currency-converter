import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryProvider } from "./api/QueryProvider";
import { queryClient } from "./api/QueryClient";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryProvider queryClient={queryClient}>
      <App />
    </QueryProvider>
  </React.StrictMode>,
);
