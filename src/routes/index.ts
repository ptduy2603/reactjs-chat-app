import HomePage from "../pages/Home";
import ChatPage from "../pages/Chat";

const routes: RouteType[] = [
  {
    path: "/",
    element: HomePage,
  },
  {
    path: "/chats",
    element: ChatPage,
  },
];

export default routes;
