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
        path: "/add-Asset",
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
        path: "/requestAsset",
        element: (
          <PrivateRoute>
            <RequestAsset />
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
