import HomePage from "../pages/Home";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";

// there are 2 groups of routes
export const authRoutes: RouteType[] = [
  {
    path: "/login",
    element: LoginPage,
  },
  {
    path: "/register",
    element: RegisterPage,
  },
];

export const mainRoutes: RouteType[] = [
  {
    path: "/",
    element: HomePage,
  },
];
