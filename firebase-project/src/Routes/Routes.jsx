import { useRoutes } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import Home from "../Pages/Home";

export default function Routes() {
  return useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/auth/*",
      element: <AuthRoutes />,
    },
  ]);
}
