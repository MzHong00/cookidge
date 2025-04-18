import styles from "./footer.module.css";

export const Footer = () => {
  return (
    <div className={`${styles.footer} flex-column-center`}>
      <span>&copy; 2024 Cookidge.</span>
      <ul className="flex-row">
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
