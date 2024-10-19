import serviceInstance from "./service";

const authPaths = {
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
