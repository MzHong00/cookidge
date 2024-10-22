import { Link } from "react-router-dom";

import styles from "./footer.module.css";

export const Footer = () => {
  return (
    <div className={`${styles.footer} flex-column-center`}>
      <ul className="flex-row">
        <li>
          <span>&copy; 2024 Cookidge.</span>
        </li>
        <li>
          <Link to={"help"}>개인정보 처리방침</Link>
        </li>
        <li>
          Icons by{" "}
          <a
            href="https://icons8.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Icons8
          </a>
        </li>
      </ul>
    </div>
  );
};
