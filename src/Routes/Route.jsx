import { createBrowserRouter, Link } from "react-router";
import Home from "../Pages/HomePage/Home";
import AllRequests from "../Pages/AllRequests/AllRequests";
import RequestAsset from "../Pages/RequestAsset/RequestAsset";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import AddAsset from "../Pages/AddAsset/AddAsset";
import AllAsset from "../Pages/AssetListPage/AllAsset";
import MyTeam from "../Pages/MyTeam/MyTeam";
import EmployeeProfile from "../Pages/EmployeeProfile/EmployeeProfile";
import EmployeeRoute from "./EmployeeRoute";
import Register from "../Pages/RegisterPage/Register";
import MyAssets from "../Pages/MyAssets/MyAssets";
import PaymentSuccess from "../Pages/paymentSuccess/payment-success";
import Login from "../Pages/Login/Login";
import RootLayout from "../Layouts/RootLayout";
import AdminRoute from "./AdminRoute";
import UpgradePackage from "../Pages/UpgradePackage/UpgradePackage";
import Testimonial from "../Pages/Testimonial/Testimonial";
import JoinHr from "../Pages/join-hr/JoinHr";
import Employees from "../Pages/Employees/Employees";
import Dashboard from "../Pages/Dashboard";
import DashboardAssetRequests from "../Pages/DashboardAssetRequests";
import DashboardApprovals from "../Pages/DashboardApprovals";
import DashboardProfile from "../Pages/DashboardProfile";
import DashboardLayout from "../Layouts/DashboardLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/testimonial",
        element: <Testimonial />,
      },
      {
        path: "/add-Asset",
        element: (
          <AdminRoute>
            <AddAsset />
          </AdminRoute>
        ),
      },
      {
        path: "/asset-list",
        element: (
          <AdminRoute>
            <AllAsset />
          </AdminRoute>
        ),
      },
      {
        path: "/all-Requests",
        element: (
          <AdminRoute>
            <AllRequests />
          </AdminRoute>
        ),
      },
      {
        path: "/employee-list",
        element: (
          <AdminRoute>
            <Employees />
          </AdminRoute>
        ),
      },
      {
        path: "/packages",
        element: (
          <AdminRoute>
            <UpgradePackage />
          </AdminRoute>
        ),
      },

      //--------------- Employee Link ------------------------
      {
        path: "/my-assets",
        element: (
          <EmployeeRoute>
            <MyAssets />
          </EmployeeRoute>
        ),
      },
      {
        path: "/request-Asset",
        element: (
          <EmployeeRoute>
            <RequestAsset />
          </EmployeeRoute>
        ),
      },
      {
        path: "/my-Team",
        element: (
          <EmployeeRoute>
            <MyTeam />
          </EmployeeRoute>
        ),
      },
      {
        path: "/employeeProfile",
        element: (
          <EmployeeRoute>
            <EmployeeProfile />
          </EmployeeRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "join-hr",
        element: <JoinHr />,
      },
      {
        path: "/payment-success",
        element: <PaymentSuccess />,
      },
    ],
  },
  // Dashboard Routes - Separate layout
  {
    path: "/dashboard",
    element: (
      <AdminRoute>
        <DashboardLayout />
      </AdminRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "asset-requests",
        element: <DashboardAssetRequests />,
      },
      {
        path: "approvals",
        element: <DashboardApprovals />,
      },
      {
        path: "profile",
        element: <DashboardProfile />,
      },
    ],
  },

  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
