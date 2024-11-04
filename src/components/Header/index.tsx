import styles from "./Header.module.scss";
import SearchDrawer from "../SearchDrawer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faBell,
  faUser,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import ProfileModal from "../ProfileModal";

function Header() {
  const [isOpenSearchDrawer, setIsOpenSearchDrawer] = useState(false);
  const [isShowUserModal, setIsShowUserModal] = useState(false);
  const { user, logout } = useContext(AuthContext) || {};

  const handleCloseDrawer = () => setIsOpenSearchDrawer(false);

  return (
    <>
      <header className={styles.header}>
        <div className="container">
          <div className={styles.inner}>
            <button
              className={styles["search_btn"]}
              onClick={() => setIsOpenSearchDrawer(true)}
            >
              <FontAwesomeIcon icon={faSearch} />
              <span>Search user</span>
            </button>
            <span className={styles["app_name"]}>TDChat</span>
            <div className={styles["account_options"]}>
              <div className={styles["notification_icon"]}>
                <FontAwesomeIcon icon={faBell} />
                <ul className={styles["menu"]}>
                  <li className={styles["menu_item"]}>
                    Bạn vừa nhận được tin nhắn từ A
                  </li>
                  <li className={styles["menu_item"]}>
                    Bạn vừa nhận được tin nhắn từ B
                  </li>
                </ul>
              </div>
              <div className={styles["user_icon"]}>
                <img src={user?.avatar} alt="User avatar" />
                <ul className={styles["menu"]}>
                  <li
                    className={styles["menu_item"]}
                    onClick={() => setIsShowUserModal(true)}
                  >
                    <FontAwesomeIcon icon={faUser} />
                    My profile
                  </li>
                  <li className={styles["menu_item"]} onClick={logout}>
                    <FontAwesomeIcon icon={faSignOut} />
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
      {isOpenSearchDrawer && (
        <SearchDrawer handleCloseDrawer={handleCloseDrawer} />
      )}
      {isShowUserModal && (
        <ProfileModal
          user={user}
          handleCloseModal={() => setIsShowUserModal(false)}
        />
      )}
    </>
  );
}

export default Header;
