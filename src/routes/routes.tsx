import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import routesGenerator from "../utils/routesGenerator";
import { AdminPaths } from "./admin.routes";
import { FacultyPaths } from "./faulty.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: <App />,
    children: routesGenerator(AdminPaths )
  },
  {
    path: "/faculty",
    element: <App />,
    children: routesGenerator( FacultyPaths)
  },
  {
    path: "/student",
    element: <App />,
    children: routesGenerator(AdminPaths )
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <SignUp />,
  },
]);
export default router;
