import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router";
import Cocktails from "./cocktails/cocktails";
import Layout from "./components/layout";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route path="/cocktails" element={<Cocktails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
