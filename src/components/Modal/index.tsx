import { ReactNode } from "react";
import styles from "./Modal.module.scss";

function Modal({
  children,
  handleClose,
}: {
  children: ReactNode;
  handleClose: () => void;
}) {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.modal}>{children}</div>
        <div className="overlay" onClick={handleClose}></div>
      </div>
    </>
  );
}

export default Modal;
