import "./Home.scss";
import { useEffect, useContext } from "react";
import io from "socket.io-client";
const socket = io(constants.BASE_URL);

import constants from "../../constants";
import { AuthContext } from "../../contexts/AuthContext";

function HomePage() {
  useEffect(() => {
    socket.emit("chat", "Hello I am client");

    socket.on("greet", (greeting) => console.log(greeting));

    return () => {
      socket.off("chat");
    };
  }, []);

  const { user, logout } = useContext(AuthContext) ?? {};

  return (
    <>
      <h1>Hello {user?.username}</h1>
      <div>This is my home page</div>
      <button onClick={logout}>Logout</button>
    </>
  );
}

export default HomePage;
