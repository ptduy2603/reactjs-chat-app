import serviceInstance from "./index";

const chatPaths = {
  create: "chat/create",
  get: "chat/get",
  remove: "chat/remove",
};

export const getUserChats = async () => {
  const data = await serviceInstance.get(chatPaths.get, true, null);
  return data?.chats || [];
};

export const createNewChat = async (partnerId: string) => {
  const data = await serviceInstance.post(
    chatPaths.create,
    { partnerId },
    null,
    true
  );
  return data.chat;
};

export const removeChat = async (chatId: string) => {
  const data = await serviceInstance.delete(chatPaths.remove, { chatId }, true);
  return data.message;
};
