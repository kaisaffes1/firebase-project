import { useRoutes } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import Home from "../Pages/Home";
import Layout from "../Components/Layout";
import Receives from "../Pages/Receives";

export default function Routes() {
  return useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/receives",
          element: <Receives />,
        },
        {
          path: "/shares",
          element: <h1>Share goes here</h1>,
        },
      ],
    },
    {
      path: "/auth/*",
      element: <AuthRoutes />,
    },
  ]);
}
