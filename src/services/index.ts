import serviceInstance from "./service";

const authPaths = {
  fetchUser: "auth/user",
  fetchAllUsers: "auth/users",
  login: "auth/login",
  googleLogin: "auth/login/google",
  facebookLogin: "auth/login/facebook",
  register: "auth/register",
};

// Auth services
export const loginWithGoogle = async (
  user: {
    email: string | null;
    username: string | null;
    avatar: string | null;
  },
  token: string | undefined
) => {
  const data = await serviceInstance.post(authPaths.googleLogin, user, token);
  serviceInstance.saveToken(data.token);
  return data;
};

export const loginWithFacebook = async (
  user: {
    username: string | null;
    avatar: string | null;
  },
  token: string | undefined
) => {
  const data = await serviceInstance.post(authPaths.facebookLogin, user, token);
  serviceInstance.saveToken(data.token);
  return data;
};

export const defaultLogin = async (email: string, password: string) => {
  const data = await serviceInstance.post(authPaths.login, {
    email,
    password,
  });
  serviceInstance.saveToken(data.token);
  return data;
};

export const fetchUser = async () => {
  const data = await serviceInstance.get(authPaths.fetchUser, true, null);
  return data.user;
};

export const register = async (user: {
  username: string;
  email: string;
  password: string;
  avatar: string;
}) => {
  const data = await serviceInstance.post(authPaths.register, user);
  return data;
};
