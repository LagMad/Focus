import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Login from "../pages/Login";
import Home from "../pages/Home";
import Register from "../pages/Register.jsx";
import NotFound from "../pages/NotFound";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default Router;
