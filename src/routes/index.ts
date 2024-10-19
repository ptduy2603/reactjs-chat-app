import HomePage from "../pages/Home";
import ChatPage from "../pages/Chat";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";

const routes: RouteType[] = [
  {
    path: "/",
    element: HomePage,
  },
  {
    path: "/chats",
    element: ChatPage,
  },
  {
    path: "/login",
    element: LoginPage,
  },
  {
    path: "/register",
    element: RegisterPage,
  },
];

export default routes;
