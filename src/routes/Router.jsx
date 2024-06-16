import React from "react";
import { createBrowserRouter } from "react-router-dom";

import ProtectedRoute from "../components/routes/ProtectedRoute";

import Login from "../pages/Login";
import Home from "../pages/Home";
import Register from "../pages/Register.jsx";
import NotFound from "../pages/NotFound";
import Agenda from "../pages/Agenda";
import Habit from "../pages/Habit";
import Notes from "../pages/Notes";
import Profile from "../pages/Profile";
import ToDo from "../pages/ToDo";

const Router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/agenda",
        element: <Agenda />,
      },
      {
        path: "/habit",
        element: <Habit />,
      },
      {
        path: "/notes",
        element: <Notes />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/todo",
        element: <ToDo />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default Router;
