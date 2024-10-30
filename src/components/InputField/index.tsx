import React, { ReactNode, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

import styles from "./InputField.module.scss";

type InputFieldProps = {
  id: string;
  name: string;
  label: string;
  value?: string;
  isSecure?: boolean | undefined;
  placeholder?: string;
  errorMessage?: string;
  type?: string;
  validFormats?: string;
  onChange?: React.ChangeEventHandler;
  onFocus?: React.FocusEventHandler;
  classes?: string | undefined;
  icon?: ReactNode;
};

function InputField({
  id,
  name,
  label,
  value,
  isSecure,
  placeholder = "",
  onChange = () => {},
  onFocus = () => {},
  type = "text",
  validFormats,
  classes,
  icon,
  errorMessage,
  ...params
}: InputFieldProps) {
  const [isShowText, setIsShowText] = useState(!isSecure);
  const [error, setError] = useState(errorMessage);

  useEffect(() => {
    setError(errorMessage);
  }, [errorMessage]);

  return (
    <>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <div className={classNames(styles["input-field"], error && styles.error)}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <input
          {...params}
          id={id}
          name={name}
          accept={validFormats ?? "*"}
          value={value}
          type={isShowText ? type : "password"}
          className={`${styles.input} ${classes ?? ""}`}
          placeholder={placeholder}
          spellCheck="false"
          onChange={onChange}
          onFocus={onFocus}
        />

        {isSecure && (
          <span
            className={styles.icon}
            onClick={() => setIsShowText(!isShowText)}
          >
            {isShowText ? (
              <FontAwesomeIcon icon={faEye} className={styles.eye} />
            ) : (
              <FontAwesomeIcon icon={faEyeSlash} className={styles.eye} />
            )}
          </span>
        )}
      </div>
      {error && <span className={styles.error}>{error}</span>}
    </>
  );
}

export default InputField;
