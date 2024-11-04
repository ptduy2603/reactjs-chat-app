import styles from "./ChatCard.module.scss";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { AuthContext } from "../../contexts/AuthContext";

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

  const handleFormatDate = (date: Date | undefined) => {
    if (!date) return "0 phút trước";
    const now = moment();
    const updatedAt = moment(date);
    const diffInMinutes = now.diff(updatedAt, "minutes");
    const diffInHours = now.diff(updatedAt, "hours");
    const diffInDays = now.diff(updatedAt, "days");

    if (diffInMinutes < 60) {
      return `${diffInMinutes} phút trước`;
    } else if (diffInHours < 24) {
      return `${diffInHours} giờ trước`;
    } else if (diffInDays < 30) {
      return `${diffInDays} ngày trước`;
    } else {
      return updatedAt.format("DD/MM");
    }
  };

  return (
    <>
      <div className={styles.wrapper}>
        <img src={image} alt={`${title} avatar`} />
        <div className={styles.content}>
          <h3>{title}</h3>
          <p>{chat.lastMessage?.content || "Bạn ăn cơm chưa"}</p>
        </div>
        <div className={styles.options}>
          <span className={styles.time}>
            {handleFormatDate(chat?.lastMessage?.updatedAt ?? chat.createdAt)}
          </span>
          <FontAwesomeIcon className={styles.more} icon={faEllipsis} />
        </div>
      </div>
    </>
  );
}

export default ChatCard;
