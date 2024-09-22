import "./Home.scss";
import auth from "../../configs/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import loginWithGoogle from "../../services";

function HomePage() {
  const handleLoginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user: {
        email: string | null;
        username: string | null;
        avatar: string | null;
      } = {
        email: result.user?.email,
        username: result.user?.displayName,
        avatar: result.user?.photoURL,
      };

      const token: string | undefined = await result.user.getIdToken();

      const data = await loginWithGoogle(user, token);
      console.log(data);
    } catch (error) {
      console.error("Login with google error: " + error);
    }
  };

  return (
    <>
      <div>This is my home page</div>
      <button onClick={handleLoginWithGoogle}>Sign in with google</button>
    </>
  );
}

export default HomePage;
