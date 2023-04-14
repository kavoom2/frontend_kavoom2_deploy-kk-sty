import router from "@/routes";
import "@/styles/_global.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom";
import { RouterProvider } from "react-router-dom";
import useVisualViewport from "./hooks/useVisualViewport";

const VisualViewport = () => {
  useVisualViewport();

  return null;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: true,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <VisualViewport />

      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,

  document.getElementById("root"),
);
