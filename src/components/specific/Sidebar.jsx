import { Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { MdOutlineExitToApp, MdDashboardCustomize, MdManageAccounts, MdGroups } from "react-icons/md";
import { motion } from "framer-motion";

const adminTabs = [
  { name: "Dashboard",    path: "/dashboard",    icon: <MdDashboardCustomize /> },
  { name: "Transactions", path: "/transactions", icon: <MdManageAccounts /> },
  { name: "Insights",     path: "/insights",     icon: <MdGroups /> },
];

const Sidebar = ({ onClose }) => {
  const location = useLocation();

  const logoutHandler = async () => {
    const toastId = toast.loading("Logging out...");
    setTimeout(() => {
      toast.success("Logout successful!", { id: toastId });
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col px-4 py-6 bg-light-surface dark:bg-dark-surface transition-colors duration-300">

      
      <div className="flex items-center gap-2.5 mb-8 pl-2">
        <div className="w-[34px] h-[34px] rounded-[10px] bg-gradient-to-br from-accent-green to-accent-pink flex items-center justify-center shrink-0 overflow-hidden">
          <img src="./public/ZorvynLogo.jpg" alt="Z" className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="text-light-text dark:text-dark-text font-['Roboto'] font-bold text-[17px] m-0 leading-tight">
            Zorvyn
          </p>
          <p className="text-light-subtle dark:text-dark-subtle font-['Roboto_Mono'] text-[11px] m-0 tracking-[0.08em]">
            A Fintech Company
          </p>
        </div>
      </div>

      
      <nav className="flex flex-col gap-1 flex-1">
        {adminTabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <motion.div key={tab.path} whileHover={{ x: 2 }} transition={{ type: "spring", stiffness: 400 }}>
              <Link
                to={tab.path}
                onClick={onClose}
                className={`
                  flex items-center gap-3 px-3.5 py-2.5 rounded-xl
                  no-underline text-[15px] font-['Roboto'] transition-all duration-150
                  ${isActive
                    ? "bg-accent-green/10 text-accent-green border border-accent-green/20 font-bold"
                    : "bg-transparent text-light-muted dark:text-dark-muted border border-transparent hover:bg-light-hover dark:hover:bg-dark-hover hover:text-light-text dark:hover:text-dark-text font-medium"
                  }
                `}
              >
                <span className="text-[18px] flex">{tab.icon}</span>
                {tab.name}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      
      <button
        onClick={logoutHandler}
        className="
          flex items-center gap-3 px-3.5 py-2.5 rounded-xl w-full
          border border-accent-pink/15 bg-transparent
          text-accent-pink font-['Roboto'] font-semibold text-[15px]
          cursor-pointer transition-colors duration-200
          hover:bg-accent-pink/8
        "
        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(224,92,122,0.08)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      >
        <MdOutlineExitToApp className="text-[18px]" />
        Logout
      </button>

    </div>
  );
};

export default Sidebar;