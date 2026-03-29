import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from "./src/pages/Dashboard";
import { Login } from "./src/pages/Login";
import { Register } from "./src/pages/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Dashboard />,
  },
  {
    path: "*",
    element: <>not found page</>,
  },
]);
