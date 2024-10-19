import constants from "../constants";
const { EMAIL_VALIDATION_REGEX } = constants;

export const validateEmail = (email: string) => {
  return EMAIL_VALIDATION_REGEX.test(email);
};
