import { FC } from "react";
import Header from "./header/header";
import { Outlet } from "react-router";

const Layout: FC = () => {
  return (
    <div>
      <Header />
      <main className="flex flex-row min-h-[calc(100vh-64px)]">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;