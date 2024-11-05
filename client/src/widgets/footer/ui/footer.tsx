import { Link } from "react-router-dom";

import styles from "./footer.module.css";

export const Footer = () => {
  return (
    <div className={`${styles.footer} flex-column-center`}>
      <span>&copy; 2024 Cookidge.</span>
      <ul className="flex-row">
        <li>
          <Link to={"help"}>개인정보 처리방침</Link>
        </li>
        <li>
          Icons by{" "}
          <a
            href="https://icons8.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkText}
          >
            Icons8
          </a>
        </li>
        <li>
          Emoji by{" "}
          <a
            href="https://toss.im/tossface"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkText}
          >
            tossface
          </a>
        </li>
      </ul>
    </div>
  );
};
