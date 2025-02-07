import React, { FC } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router";
import Cocktails from "./cocktails/cocktails";
import Layout from "./components/layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Main: FC = () => {
  const queryClient = new QueryClient();

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<App />} />
              <Route path="/cocktails" element={<Cocktails />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Main />
);
