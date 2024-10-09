import { Outlet } from "react-router-dom";

import { Header } from "widgets/header";

import styles from "./index.module.css";

export default function Root() {
  return (
    <div className={styles.root}>
      <Header />
      <main className={styles.mainContainer}>
        <Outlet />
      </main>
    </div>
  );
}
