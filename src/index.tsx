import router from "@/routes";
import "@/styles/_global.scss";
import React from "react";
import ReactDOM from "react-dom";
import { RouterProvider } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById("root"),
);
