import React from "react";
import { createBrowserRouter } from "react-router-dom";

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
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default Router;
