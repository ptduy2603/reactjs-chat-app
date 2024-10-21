import constants from "../constants";
import { jwtDecode } from "jwt-decode";
const { EMAIL_VALIDATION_REGEX } = constants;

export const validateEmail = (email: string) => {
  return EMAIL_VALIDATION_REGEX.test(email);
};

export const convertBase64 = (
  file: File
): Promise<string | null | ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      resolve(reader.result as string);
    };

    reader.onerror = (error) => {
      reject(error);
    };
  });
};

export const isTokenExpired = (token: string) => {
  if (!token.trim()) return true;

  try {
    const decodedToken = jwtDecode(token);
    if (!decodedToken.exp) return true;

    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  } catch (error) {
    console.log(`Token decoding error: ${error}`);
    return true;
  }
};
