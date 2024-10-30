import styles from "./Button.module.scss";
import classNames from "classnames";

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
        className={classNames(
          "btn",
          styles.button,
          className,
          disabled && "disabled"
        )}
        onClick={onClick}
      >
        {icon}
        {content}
      </button>
    </>
  );
}

export default Button;
