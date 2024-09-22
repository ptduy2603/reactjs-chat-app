import constants from "../constants";
import axios from "axios";

const { BASE_URL } = constants;

// Auth services
const loginWithGoogle = async (
  user: {
    email: string | null;
    username: string | null;
    avatar: string | null;
  },
  token: string | undefined
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/login/google`,
      {
        ...user,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export default loginWithGoogle;
