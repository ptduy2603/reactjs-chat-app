/* eslint-disable @typescript-eslint/no-explicit-any */
type RouteType = {
  path: string;
  element: any;
};

type ButtonProps = {
  icon?: any;
  className?: string;
  content: string;
  onClick: function;
  disabled?: boolean;
};

// auth types
type User = {
  id: string;
  username: string;
  avatar: string;
  email?: string;
};

type AuthContextType = {
  user: User | null | undefined;
  loading: boolean;
  login: (user: User) => void;
  logout: () => void;
};
