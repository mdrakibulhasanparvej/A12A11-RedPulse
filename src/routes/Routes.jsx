import { createBrowserRouter } from "react-router";
import Mainlayout from "../layouts/Mainlayout";
import { Children, Component } from "react";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import Statistics from "../pages/Dashboard/common/Statistics";
import ErrorPage from "../pages/ErrorPage";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Mainlayout,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        Component: Home,
      },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/signup",
    Component: Register,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />,
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: Statistics,
      },
    ],
  },
]);
export default router;
