import { Outlet } from "react-router-dom";

import { Header } from "widgets/header";
import { Sidebar } from "widgets/sidebar";

export default function Root() {
  return (
    <div style={{display: "flex"}}>
      <Sidebar />
      <Header />
      <Outlet />
    </div>
  );
}
