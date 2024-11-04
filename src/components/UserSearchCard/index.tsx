import styles from "../Header/Header.module.scss";
import { ChatContext } from "../../contexts/ChatContext";
import { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import { createNewChat } from "../../services/chat";
import { AuthContext } from "../../contexts/AuthContext";

type Props = {
  user: User;
  handleResetInput: () => void;
};

function UserSearchCard({ user, handleResetInput }: Props): any {
  const { addChat, chats }: any = useContext(ChatContext);
  const { user: creator }: any = useContext(AuthContext);

  const handleAddChat = async () => {
    const isExistingChat = chats.some((chat: Chat) => {
      const memberIds: string[] = chat.members.map((member) => member.id);
      return memberIds.includes(creator.id) && memberIds.includes(user.id);
    });

    if (isExistingChat) {
      toast.warning("A chat with this user already exists");
      return;
    }

    try {
      const chat: Chat = await createNewChat(user.id);
      if (chat && addChat) {
        addChat(chat);
      }
      toast.success("Added new chat successfully");
      handleResetInput();
    } catch (error: any) {
      toast.warning(error?.response?.data?.message || "Create new chat error");
    }
  };

  return (
    <>
      <li className={styles["user-card"]} onClick={handleAddChat}>
        <img src={user.avatar} alt={`${user.username} avatar`} />
        <div className={styles["user-card-info"]}>
          <h4>{user.username}</h4>
          <h5>
            Email : <span>{user?.email}</span>
          </h5>
        </div>
      </li>
      <ToastContainer autoClose={1000} />
    </>
  );
}

export default UserSearchCard;
