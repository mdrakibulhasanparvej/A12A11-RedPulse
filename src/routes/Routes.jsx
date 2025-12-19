import { createBrowserRouter } from "react-router";
import { Suspense, lazy } from "react";

import Mainlayout from "../layouts/Mainlayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import Statistics from "../pages/Dashboard/common/Statistics";
import ErrorPage from "../pages/ErrorPages/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import DashboardSkeleton from "../components/ui/Loading/Dashborad/DashboardSkeleton";
import Profile from "../pages/Dashboard/common/Profile";
import MyDonationRequest from "../pages/Dashboard/Donner/MyDonationRequest";
import CreateDonationRequest from "../pages/Dashboard/Donner/CreateDonationRequest";
import AdminRoute from "./AdminRoute";
import AllDonationRequest from "../pages/PublicPage/AllDonationRequest";
import DonationRequestDetails from "../pages/Dashboard/Donner/DonationRequestDetails";
import Search from "../pages/PublicPage/Search";

// lazy loaded pages
const Allusers = lazy(() => import("../pages/Dashboard/Admin/Allusers"));

const AllBloodDonationRequest = lazy(
  () => import("../pages/Dashboard/Admin/AllBloodDonationRequest")
);

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
      {
        path: "donation-request",
        Component: AllDonationRequest,
      },
      {
        path: "search",
        Component: Search,
      },
      {
        path: "/donation-request/:id",
        element: (
          <PrivateRoute>
            <DonationRequestDetails />
          </PrivateRoute>
        ),
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
      <PrivateRoute>
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
        element: (
          <AdminRoute>
            <Allusers />
          </AdminRoute>
        ),
      },
      {
        path: "all-blood-donation-request",
        element: <AllBloodDonationRequest />,
      },
      {
        path: "profile",
        Component: Profile,
      },
      {
        path: "my-donation-requests",
        Component: MyDonationRequest,
      },
      {
        path: "create-donation-request",
        Component: CreateDonationRequest,
      },
    ],
  },
]);

export default router;

//  skeleton={<DashboardSkeleton />}
