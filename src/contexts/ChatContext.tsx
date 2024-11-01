import { createContext, ReactNode, useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

import { getUserChats } from "../services/chat";
// import { getGroups } from "../services/group";
export const ChatContext = createContext<ChatContextType | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const { user } = useContext(AuthContext) || {};

  useEffect(() => {
    const fetchChatsAndGroups = async () => {
      if (user) {
        try {
          let fetchedChats: any = await getUserChats();
          fetchedChats = fetchedChats.map((chat: any) => {
            chat.id = chat._id;
            delete chat._id;
            return chat;
          });
          // const fetchedGroups: Group[] = await getGroups();

          setChats(fetchedChats);
          // setGroups(fetchedGroups);
        } catch (error) {
          console.error(`Fetch chats and groups error: ${error}`);
        }
      }
    };

    fetchChatsAndGroups();
  }, [user]);

  const addChat = (newChat: Chat) => {
    setChats([newChat, ...chats]);
  };

  const addGroup = (newGroup: Group) => {
    setGroups([newGroup, ...groups]);
  };

  return (
    <ChatContext.Provider value={{ chats, groups, addChat, addGroup }}>
      {children}
    </ChatContext.Provider>
  );
}
