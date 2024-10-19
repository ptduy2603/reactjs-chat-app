import RingLoader from "react-spinners/RingLoader";

import styles from "./AppLoading.module.scss";

function AppLoading() {
  return (
    <>
      <div className={styles.wrapper}>
        <RingLoader
          loading={true}
          className={styles.loader}
          size={60}
          aria-label="Loading Ring"
          speedMultiplier={1}
          color="var(--primary-color)"
        />
      </div>
    </>
  );
}

export default AppLoading;
