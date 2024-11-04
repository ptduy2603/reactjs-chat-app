import styles from "../Header/Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { ChangeEvent, useState } from "react";
import ClipLoader from "react-spinners/Cliploader";

import { searchUsers } from "../../services/auth";
import UserSearchCard from "../UserSearchCard";
import Button from "../Button";

type Props = {
  handleCloseDrawer: () => void;
};

function SearchDrawer({ handleCloseDrawer }: Props) {
  const [searchInput, setSearchInput] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleChangeSearchInput = (event: ChangeEvent<HTMLInputElement>) =>
    setSearchInput(event.target.value);

  const handleSearchUsers = async () => {
    if (!searchInput.trim()) return setUsers([]);
    setIsSearching(true);
    try {
      const foundUsers = (await searchUsers(searchInput)) || [];
      setUsers(foundUsers);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleResetInput = () => {
    setSearchInput("");
    setUsers([]);
  };

  return (
    <>
      <div className={styles["search_drawer"]}>
        <h3 className={styles.title}>Search Users</h3>
        <div className={styles["drawer-content"]}>
          <div className={styles["drawer-input"]}>
            <input
              type="text"
              autoFocus
              spellCheck={false}
              placeholder="Enter username or email"
              value={searchInput}
              onChange={handleChangeSearchInput}
            />
            <Button
              content={<FontAwesomeIcon icon={faMagnifyingGlass} />}
              onClick={handleSearchUsers}
            />
          </div>
          <ul className={styles["drawer-result"]}>
            {isSearching ? (
              <ClipLoader
                color="var(--primary-color)"
                cssOverride={{ margin: "0 auto" }}
                loading={true}
                size={40}
              />
            ) : (
              <>
                {users.length ? (
                  users.map((user) => (
                    <UserSearchCard
                      key={user.id}
                      user={user}
                      handleResetInput={handleResetInput}
                    />
                  ))
                ) : (
                  <p style={{ textAlign: "center" }}>User not found</p>
                )}
              </>
            )}
          </ul>
        </div>
      </div>
      <div className="overlay" onClick={handleCloseDrawer}></div>
    </>
  );
}

export default SearchDrawer;
