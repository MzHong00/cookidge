import { Outlet } from "react-router-dom";

import { Header } from "widgets/header";
import { Sidebar } from "widgets/sidebar";

export default function Root() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main style={{width: "100%"}}>
        <Header />
        <Outlet />
      </main>
    </div>
  );
}
