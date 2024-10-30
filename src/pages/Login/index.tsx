import classNames from "classnames";
import { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import auth from "../../configs/firebase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import {
  loginWithGoogle,
  loginWithFacebook,
  defaultLogin,
} from "../../services";
import styles from "./Login.module.scss";
import InputField from "../../components/InputField";
import NavigationStatement from "../../components/NavigationStatement";
import Button from "../../components/Button";
import { validateEmail } from "../../utils";
import AppLoading from "../../components/AppLoading";
import { AuthContext } from "../../contexts/AuthContext";

type Errors = {
  email?: string;
  password?: string;
};

function LoginPage() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigator = useNavigate();
  const { login }: any = useContext(AuthContext);

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

  const handleLoginWithGoogle = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    try {
      const provider = new GoogleAuthProvider();
      provider.addScope("email");
      const result = await signInWithPopup(auth, provider);

      console.log("Google result:", result);
      const user: {
        email: string | null;
        username: string | null;
        avatar: string | null;
      } = {
        email: result.user?.email,
        username: result.user?.displayName,
        avatar: result.user?.photoURL,
      };

      setIsLoading(true);
      const token: string | undefined = await result.user.getIdToken();

      const data = await loginWithGoogle(user, token);
      toast.success("Login successfully!");

      setTimeout(() => {
        login(data.user);
        navigator("/", { replace: true }); // Navigate to the home page
      }, 2000);
    } catch (error: any) {
      console.error("Login with google error: " + error);
      toast.error(
        error?.response?.data?.message ?? "Failed to login with google"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginWithFacebook = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    try {
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user: {
        username: string | null;
        avatar: string | null;
      } = {
        username: result.user?.displayName,
        avatar: result.user?.photoURL,
      };

      setIsLoading(true);
      const token = await result.user.getIdToken();
      const data = await loginWithFacebook(user, token);
      toast.success("Login successfully!");

      setTimeout(() => {
        login(data.user);
        navigator("/", { replace: true }); // Navigate to the home page
      }, 2000);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ?? "Failed to login with facebook"
      );
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const newErrors: {
      email?: string;
      password?: string;
    } = {};

    if (!user.email.trim()) {
      newErrors.email = "Please enter your email!";
    } else if (!validateEmail(user.email.trim())) {
      newErrors.email = "Your email is not valid!";
    }

    if (!user.password.trim()) {
      newErrors.password = "Please enter your password!";
    }

    if (!Object.keys(newErrors).length) {
      setIsLoading(true);
      try {
        const data = await defaultLogin(user.email, user.password);
        toast.success("Login successfully!");

        setTimeout(() => {
          login(data?.user);
          navigator("/", { replace: true }); // Navigate to the home page
        }, 2000);
      } catch (error: any) {
        toast.error(error?.response?.data?.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrors(newErrors);
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
              alt="Chat app logo of login form"
            />
          </div>
          <div className="col col-lg-8 col-md-8 col-sm-12">
            <div className={styles["form-content"]}>
              <h2 className={styles.title}>Login</h2>
              <form action="">
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
                  <div className={styles["forgot-password"]}>
                    <Link to={"/"}>Forgot password</Link>
                  </div>
                </div>

                <div className={styles["form-group"]}>
                  <div className={styles["horizontal-line"]}>
                    <span></span>
                    <span>or</span>
                    <span></span>
                  </div>
                  <div className={styles["login-options"]}>
                    <button
                      className={classNames("btn")}
                      onClick={handleLoginWithGoogle}
                    >
                      <img alt="Google logo" src="/images/google.png" />
                      <span>Google</span>
                    </button>

                    <button
                      className={classNames("btn")}
                      onClick={handleLoginWithFacebook}
                    >
                      <img alt="Facebook logo" src="/images/facebook.png" />
                      <span>Facebook</span>
                    </button>
                  </div>
                </div>

                <div className={styles["form-group"]}>
                  <NavigationStatement
                    question="Don't have an account?"
                    statement="Sign up"
                    link="/register"
                  />
                </div>
                <div className={styles["form-group"]}>
                  <Button
                    content="Login"
                    className={styles["login-btn"]}
                    onClick={handleLogin}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>

        <ToastContainer
          autoClose={2000}
          closeOnClick
          pauseOnHover
          theme="light"
        />
        {isLoading && <AppLoading />}
      </div>
    </>
  );
}

export default LoginPage;
