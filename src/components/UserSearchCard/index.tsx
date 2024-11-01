import styles from "../Header/Header.module.scss";

type Props = {
  user: User;
};

function UserSearchCard({ user }: Props): any {
  return (
    <>
      <li className={styles["user-card"]}>
        <img src={user.avatar} alt={`${user.username} avatar`} />
        <div className={styles["user-card-info"]}>
          <h4>{user.username}</h4>
          <h5>Email : {user.email}</h5>
        </div>
      </li>
    </>
  );
}

export default UserSearchCard;
