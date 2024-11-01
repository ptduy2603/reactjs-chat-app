import styles from "./ChatCard.module.scss";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

type Props = {
  chat: Chat | Group;
  isGroupChat: boolean;
};

function ChatCard({ chat, isGroupChat }: Props) {
  const { user } = useContext(AuthContext) || {};
  const [image, setImage] = useState<string | undefined>("");
  const [title, setTitle] = useState<string | undefined>("");

  useEffect(() => {
    let title: string | undefined = "";
    let image: string | undefined = "";
    if (isGroupChat && "groupName" in chat) {
      title = chat?.groupName;
      image = "";
    } else {
      const partner = chat.members.find((member) => member.id !== user?.id);
      title = partner?.username;
      image = partner?.avatar;
    }

    setImage(image);
    setTitle(title);
  }, [user, chat, isGroupChat]);

  return (
    <>
      <div className={styles.wrapper}>
        <img src={image} alt={`${title} avatar`} />
        <div className={styles.content}>
          <h3>{title}</h3>
          <p>{chat.lastMessage?.content || "Bạn ăn cơm chưa"}</p>
        </div>
        <div className={styles.options}>
          <span className={styles.time}>8 phút trước</span>
          <FontAwesomeIcon className={styles.more} icon={faEllipsis} />
        </div>
      </div>
    </>
  );
}

export default ChatCard;
