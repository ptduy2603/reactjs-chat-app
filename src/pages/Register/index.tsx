import classNames from "classnames";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import styles from "../Login/Login.module.scss";
import InputField from "../../components/InputField";
import NavigationStatement from "../../components/NavigationStatement";
import Button from "../../components/Button";
import { validateEmail, convertBase64 } from "../../utils";
import AppLoading from "../../components/AppLoading";
import { register } from "../../services";

type Errors = {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

function RegisterPage() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [avatar, setAvatar] = useState<string | null>("");
  const navigator = useNavigate();

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value.startsWith(" ")) {
      const newUser = {
        ...user,
        [event.target.name]: event.target.value,
      };

      setUser(newUser);
    }
  };

  const handleInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    const newErrors: Errors = { ...errors };
    delete newErrors[event.target.name as keyof Errors];

    setErrors(newErrors);
  };

  const handleUploadAvatar = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const base64Image = await convertBase64(file);
      setAvatar(base64Image as string);
    }
  };

  const handleRegister = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const errors: Errors = {};

    if (!user.username.trim()) {
      errors.username = "Please enter your username!";
    }

    if (!user.email.trim()) {
      errors.email = "Please enter your email!";
    } else if (!validateEmail(user.email.trim())) {
      errors.email = "Your email is invalid!";
    }

    if (!user?.password.trim()) {
      errors.password = "Please enter your password!";
    }

    if (!user.confirmPassword.trim()) {
      errors.confirmPassword = "Please confirm your password!";
    } else if (user.confirmPassword.trim() !== user.password.trim()) {
      errors.confirmPassword = "Confirmation password is incorrect!";
    }

    if (Object.keys(errors).length) {
      setErrors(errors);
      return;
    }

    setIsLoading(true);
    try {
      const newUser: {
        username: string;
        email: string;
        password: string;
        avatar: string;
      } = {
        username: user?.username,
        email: user?.email,
        password: user?.password,
        avatar: avatar || "",
      };

      await register(newUser);
      toast.success("Register new user successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        navigator("/login", { replace: true });
      }, 1000);
    }
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={classNames(styles["form-container"], "row")}>
          <div
            className={classNames(
              styles["form-image"],
              "col col-lg-4 col-md-4 col-sm-0"
            )}
          >
            <img
              src="/images/logo.png"
              loading="lazy"
              alt="Chat app logo of register form"
            />
          </div>
          <div className="col col-lg-8 col-md-8 col-sm-12">
            <div className={styles["form-content"]}>
              <h2 className={styles.title}>Register new account</h2>
              <form action="">
                <div className={styles["form-group"]}>
                  <InputField
                    id="username"
                    name="username"
                    label="Username*"
                    icon={<FontAwesomeIcon icon={faUser} />}
                    value={user?.username}
                    placeholder="Enter your username..."
                    onChange={handleChangeValue}
                    onFocus={handleInputFocus}
                    errorMessage={errors?.username || ""}
                  />
                </div>

                <div className={styles["form-group"]}>
                  <InputField
                    id="email"
                    name="email"
                    label="Email*"
                    icon={<FontAwesomeIcon icon={faEnvelope} />}
                    value={user?.email}
                    placeholder="Enter your email..."
                    onChange={handleChangeValue}
                    onFocus={handleInputFocus}
                    errorMessage={errors?.email || ""}
                  />
                </div>

                <div className={styles["form-group"]}>
                  <InputField
                    id="password"
                    name="password"
                    label="Password*"
                    icon={<FontAwesomeIcon icon={faLock} />}
                    value={user?.password}
                    placeholder="Enter your password..."
                    onChange={handleChangeValue}
                    onFocus={handleInputFocus}
                    isSecure
                    errorMessage={errors?.password || ""}
                  />
                </div>

                <div className={styles["form-group"]}>
                  <InputField
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Confirm password*"
                    icon={<FontAwesomeIcon icon={faLock} />}
                    value={user?.confirmPassword}
                    placeholder="Confirm your password..."
                    onChange={handleChangeValue}
                    onFocus={handleInputFocus}
                    isSecure
                    errorMessage={errors?.confirmPassword || ""}
                  />
                </div>

                <div className={styles["form-group"]}>
                  <InputField
                    name="avatar"
                    id="avatar"
                    type="file"
                    label="Choose avatar"
                    validFormats="image/*"
                    onChange={handleUploadAvatar}
                  />
                </div>

                <div className={styles["form-group"]}>
                  <NavigationStatement
                    question="Already have an account?"
                    statement="Login"
                    link="/login"
                  />
                </div>
                <div className={styles["form-group"]}>
                  <Button
                    content="Register"
                    className={styles["login-btn"]}
                    onClick={handleRegister}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>

        <ToastContainer
          autoClose={1000}
          closeOnClick
          pauseOnHover
          theme="light"
        />
        {isLoading && <AppLoading />}
      </div>
    </>
  );
}

export default RegisterPage;
