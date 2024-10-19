import "./Home.scss";
import { useEffect } from "react";
import io from "socket.io-client";
import constants from "../../constants";
const socket = io(constants.BASE_URL);

function HomePage() {
  useEffect(() => {
    socket.emit("chat", "Hello I am client");

    socket.on("greet", (greeting) => console.log(greeting));

    return () => {
      socket.off("chat");
    };
  }, []);

  return (
    <>
      <div>This is my home page</div>
    </>
  );
}

export default HomePage;
