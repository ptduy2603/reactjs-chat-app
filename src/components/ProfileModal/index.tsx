import styles from "./ProfileModel.module.scss";
import Modal from "../Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

type Props = {
  user: User | null | undefined;
  handleCloseModal: () => void;
};

function ProfileModal({ user, handleCloseModal }: Props) {
  if (!user) return <></>;

  return (
    <>
      <Modal handleClose={handleCloseModal}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>User profile</h2>
          <button className={styles.avatar}>
            <img src={user?.avatar} alt={user?.username + " avatar"} />
          </button>
          <ul className={styles.info}>
            <li>
              <span>Username: </span> {user?.username}
            </li>
            <li>
              <span>Email:</span> {user?.email || "No email"}
            </li>
          </ul>
          <button className={styles["close-btn"]} onClick={handleCloseModal}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      </Modal>
    </>
  );
}

export default ProfileModal;
