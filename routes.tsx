import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <></>,
  },
  {
    path: "/home",
    element:<></>
  },
  {
    path: "*",
    element:<>not found page</>
  }
]);