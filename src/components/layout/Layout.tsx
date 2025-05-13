import { type ReactNode } from "react";
import Sidebar from "../Sidebar";
const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full bg-primary flex flex-row gap-5 ">
      <Sidebar />
      <div className="w-full  flex flex-1 flex-col">{children}</div>
    </div>
  );
};

export default Layout;
