import { Link } from "react-router-dom";
import styles from "./NavigationStatement.module.scss";

type Props = {
  question: string;
  statement: string;
  link: string;
};

function NavigationStatement({ question, statement, link }: Props) {
  return (
    <>
      <p className={styles.wrapper}>
        <span className={styles.question}>{question}</span>
        <Link to={link}>{statement}</Link>
      </p>
    </>
  );
}

export default NavigationStatement;
