import { createContext, ReactNode, useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

import { getUserChats } from "../services/chat";
import { getGroups } from "../services/group";
export const ChatContext = createContext<ChatContextType | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const { user } = useContext(AuthContext) || {};

  useEffect(() => {
    const fetchChatsAndGroups = async () => {
      if (user) {
        try {
          const fetchedChats: Chat[] = await getUserChats();
          const fetchedGroups: Group[] = await getGroups();
          console.log("Fetch chats: ", fetchedChats, fetchedGroups);
          setChats(fetchedChats);
          setGroups(fetchedGroups);
        } catch (error) {
          console.error(`Fetch chats and groups error: ${error}`);
        }
      }
    };

    fetchChatsAndGroups();
  }, [user]);

  const addChat = (newChat: Chat) => {
    if (!newChat) return;
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
