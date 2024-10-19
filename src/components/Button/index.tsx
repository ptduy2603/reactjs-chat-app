import styles from "./Button.module.scss";
import classNames from "classnames";

const cx = classNames.bind(styles);

function Button({
  className,
  content,
  disabled,
  icon,
  onClick = () => {},
}: ButtonProps) {
  return (
    <>
      <button
        className={cx("btn", styles.button, className, disabled && "disabled")}
        onClick={onClick}
      >
        {icon}
        {content}
      </button>
    </>
  );
}

export default Button;
