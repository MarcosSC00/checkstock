import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from "./src/pages/Dashboard";
import { Login } from "./src/pages/Login";
import { Register } from "./src/pages/Register";
import { Layout } from "./src/components/layout";
import { Equipaments } from "./src/pages/Equipaments";
import { Consumption } from "./src/pages/Consumption";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "/app",
    element: <Layout />,
    children: [
      {
        path: "home",
        element: <Dashboard />,
      },
      {
        path: "equipaments",
        element: <Equipaments />,
      },
      {
        path: "consumption",
        element: <Consumption />,
      },
    ],
  },
  {
    path: "*",
    element: <>not found page</>,
  },
]);
