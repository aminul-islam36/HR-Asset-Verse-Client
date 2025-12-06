import { createBrowserRouter } from "react-router";
import Root from "../../LayOuts/RootLayout/Root";
import Home from "../../Pages/HomePage/Home";
import Login from "../../LayOuts/AuthLayouts/Login/Login";
import AuthLayout from "../../LayOuts/AuthLayouts/AuthLayout";
import Register from "../../Pages/RegisterPage/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [{ index: true, element: <Home /> }],
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
]);

export default router;
