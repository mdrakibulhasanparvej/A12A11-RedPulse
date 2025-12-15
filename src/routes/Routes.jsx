import { createBrowserRouter } from "react-router";
import Mainlayout from "../layouts/Mainlayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import Statistics from "../pages/Dashboard/common/Statistics";
import Allusers from "../pages/Dashboard/Admin/Allusers";
import ErrorPage from "../pages/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import DashboardSkeleton from "../components/ui/Loading/Dashborad/DashboardSkeleton";

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
    path: "/register",
    Component: Register,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute skeleton={<DashboardSkeleton />}>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: Statistics,
      },
      {
        path: "all-users",
        Component: Allusers,
      },
    ],
  },
]);

export default router;
