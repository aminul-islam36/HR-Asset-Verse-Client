import { createBrowserRouter } from "react-router";
import Root from "../../LayOuts/RootLayout/Root";
import Home from "../../Pages/HomePage/Home";
import Login from "../../LayOuts/AuthLayouts/Login/Login";
import AuthLayout from "../../LayOuts/AuthLayouts/AuthLayout";
import Register from "../../Pages/RegisterPage/Register";
import AllRequests from "../../Pages/AllRequests/AllRequests";
import UpgradePackage from "../../Pages/Upgrade-Package/UpgradePackage";
import RequestAsset from "../../Pages/RequestAsset/RequestAsset";
import PrivateRoute from "../PrivateRouts/PrivateRoute";
import ErrorPage from "../../Pages/ErrorPage/ErrorPage";
import AddAsset from "../../Pages/AddAsset/AddAsset";
import MyEmployeeList from "../../Pages/MyEmployyList/MyEmployeeList";
import AllAsset from "../../Pages/AssetListPage/AllAsset";
import MyAsset from "../../Pages/My-Assets/MyAsset";
import MyTeam from "../../Pages/MyTeam/MyTeam";
import EmployeeForm from "../../Components/EmployeeForm";
import EmployeeProfile from "../../Pages/EmployeeProfile/EmployeeProfile";
import HrProfile from "../../Pages/HrProfile/HrProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/all-Requests",
        element: <AllRequests />,
      },
      {
        path: "/upgrade-Package",
        element: (
          <PrivateRoute>
            <UpgradePackage />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-Asset",
        element: (
          <PrivateRoute>
            <AddAsset />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-employee-List",
        element: (
          <PrivateRoute>
            <MyEmployeeList />
          </PrivateRoute>
        ),
      },
      {
        path: "/asset-List",
        element: (
          <PrivateRoute>
            <AllAsset />
          </PrivateRoute>
        ),
      },
      {
        path: "/hrProfile",
        element: (
          <PrivateRoute>
            <HrProfile />
          </PrivateRoute>
        ),
      },

      // Employee Link ------------------------
      {
        path: "/my-asset",
        element: (
          <PrivateRoute>
            <MyAsset />
          </PrivateRoute>
        ),
      },
      {
        path: "/request-Asset",
        element: (
          <PrivateRoute>
            <RequestAsset />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-Team",
        element: (
          <PrivateRoute>
            <MyTeam />
          </PrivateRoute>
        ),
      },
      {
        path: "/employee-Profile",
        element: (
          <PrivateRoute>
            <EmployeeProfile />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
