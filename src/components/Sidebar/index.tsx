import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styles from "../../pages/Home/Home.module.scss";
import { useContext } from "react";
import { ChatContext } from "../../contexts/ChatContext";

import Button from "../Button";
import ChatCard from "../ChatCard";

function Sidebar() {
  const { chats } = useContext(ChatContext) || {};

  return (
    <>
      <div className={styles.sidebar}>
        <div className={styles["sidebar-top"]}>
          <h2>My chats</h2>
          <Button
            content="New group chat"
            onClick={() => {}}
            icon={<FontAwesomeIcon icon={faPlus} />}
          />
        </div>
        <div className={styles["chat-wrapper"]}>
          {chats?.map((chat) => (
            <ChatCard chat={chat} isGroupChat={false} key={chat.id} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Sidebar;
