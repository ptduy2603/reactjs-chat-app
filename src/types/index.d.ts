type RouteType = {
  path: string;
  element: any;
};

type ButtonProps = {
  icon?: any;
  className?: string;
  content: string | ReactDOM;
  onClick: function;
  disabled?: boolean;
};

// auth types
type User = {
  id: string;
  username: string;
  avatar: string;
  email?: string;
  googleId?: string;
  facebookId?: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

type Reaction = {
  user: User;
  icon: string;
};

type Message = {
  id: string;
  sender: User;
  content: string;
  chat?: Chat;
  group?: Group;
  originalMessage: Message | null;
  messageType: string;
  reactions: Reaction[];
  createdAt: Date;
  updatedAt: Date;
};

// chat and group in ChatContext
type Chat = {
  id: string;
  members: User[];
  lastMessage: Message | null;
  createdAt: Date;
  updatedAt: Date;
};

type Group = {
  id: string;
  groupName: string;
  host: User;
  members: User[];
  lastMessage: Message;
  createdAt: Date;
  updatedAt: Date;
};

type ChatContextType = {
  chats: Chat[] | null;
  groups: Group[] | null;
  addChat: (newChat: Chat) => void;
  addGroup: (newGroup: Group) => void;
};

type AuthContextType = {
  user: User | null | undefined;
  loading: boolean;
  login: (user: User) => void;
  logout: () => void;
};
