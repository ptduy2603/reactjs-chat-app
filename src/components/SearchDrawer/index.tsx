import styles from "../Header/Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { ChangeEvent, useState } from "react";

import ClipLoader from "react-spinners/Cliploader";
import Button from "../Button";

type Props = {
  handleCloseDrawer: () => void;
};

type UserCardProps = {
  avatar: string;
  username: string;
  email: string;
};

function UserSearchCard({ username, email, avatar }: UserCardProps): any {
  return (
    <>
      <li className={styles["user-card"]}>
        <img src={avatar} alt={`${username} avatar`} />
        <div className={styles["user-card-info"]}>
          <h4>{username}</h4>
          <h5>Email : {email}</h5>
        </div>
      </li>
    </>
  );
}

function SearchDrawer({ handleCloseDrawer }: Props) {
  const [searchInput, setSearchInput] = useState("");
  // const [users, setUsers] = useState<User[]>([]);
  const [isSearching, setIsSearching] = useState(true);

  const handleChangeSearchInput = (event: ChangeEvent<HTMLInputElement>) =>
    setSearchInput(event.target.value);

  const handleSearchUsers = async () => {
    setIsSearching(false);
  };

  return (
    <>
      <div className={styles["search_drawer"]}>
        <h3 className={styles.title}>Search Users</h3>
        <div className={styles["drawer-content"]}>
          <div className={styles["drawer-input"]}>
            <input
              type="text"
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
                <UserSearchCard
                  email="duypt@gmail.com"
                  username="Phạm Thanh Duy"
                  avatar="https://images.unsplash.com/photo-1631947430066-48c30d57b943?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3V0ZSUyMGdpcmx8ZW58MHx8MHx8fDA%3D"
                />
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
