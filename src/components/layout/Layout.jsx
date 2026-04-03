import Sidebar from "../specific/Sidebar";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Layout = ({ children }) => {
  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === "dark";

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="flex flex-col h-screen bg-light-bg dark:bg-dark-bg font-sans transition-colors duration-300 overflow-hidden">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">

        {/* Desktop sidebar */}
        <aside className="
          hidden md:block
          w-[200px] lg:w-[230px] shrink-0
          border-r border-light-border dark:border-dark-border
          bg-light-surface dark:bg-dark-surface
          overflow-y-auto
          transition-all duration-300
        ">
          <Sidebar />
        </aside>

        {/* Main content */}
        <main className="flex-1 flex flex-col overflow-y-auto bg-light-bg dark:bg-dark-bg transition-colors duration-300">
          <div className="flex-1 flex flex-col p-3 sm:p-4 md:p-6 main-content-padding">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
};

export default Layout;