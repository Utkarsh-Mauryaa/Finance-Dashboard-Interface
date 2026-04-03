import { useState } from "react";
import { HiMenuAlt2 } from "react-icons/hi";
import { HiMoon, HiSun } from "react-icons/hi2";
import { Drawer } from "@mui/material";
import Sidebar from "../specific/Sidebar";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { setIsAdmin } from "../../redux/reducer/adminCheck.slice";
import { toggleTheme } from "../../redux/reducer/theme.slice";
import { NavbarHeaderClass } from "../../utils/styles";
import { MobileButtonClass } from "../../utils/styles";
import { RoleButtonClass } from "../../utils/styles";
import { ToggleThemeButtonClass } from "../../utils/styles";

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.adminCheck.isAdmin);
  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === "dark";

  const handleRoleChange = (adminValue) => {
    dispatch(setIsAdmin(adminValue));
    localStorage.setItem("fin_is_admin", JSON.stringify(adminValue));
  };

  return (
    <>
      <header className={NavbarHeaderClass}>

        
        <div className="flex items-center gap-3"> 
          <button
            onClick={() => setIsMobile(!isMobile)}
            className={MobileButtonClass}
          >
            <HiMenuAlt2 className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]" />
          </button>

          <div className="hidden md:flex flex-col gap-0.5">
            <span className="
              text-light-text dark:text-dark-text
              font-['Roboto'] font-bold text-[17px] lg:text-[20px] leading-tight
            ">
              Welcome back, {isAdmin ? "Admin" : "Viewer"}
            </span>
            <span className="
              text-light-subtle dark:text-dark-subtle
              font-['Roboto_Mono'] text-[11px] lg:text-[13px]
            ">
              {format(new Date(), "EEEE, d MMMM yyyy")}
            </span>
          </div>
        </div>

        
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">

          <span className="hidden md:inline text-[11px] lg:text-[12px] font-bold uppercase tracking-widest text-light-muted dark:text-dark-muted select-none">
            Role:
          </span>

          <div className="
            flex items-center gap-[2px] sm:gap-[3px] p-[2px] sm:p-[3px] rounded-[8px] sm:rounded-[10px]
            border border-light-border dark:border-dark-border
            bg-light-pill dark:bg-dark-pill
          ">
            <button
              onClick={() => handleRoleChange(false)}
              className={`
                ${RoleButtonClass}
                ${!isAdmin
                  ? "bg-accent-cyan text-dark-bg shadow-[0_2px_10px_rgba(0,212,255,0.3)]"
                  : "bg-transparent text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text"
                }
              `}
            >
              Viewer
            </button>
            <button
              onClick={() => handleRoleChange(true)}
              className={`
                ${RoleButtonClass}
                ${isAdmin
                  ? "bg-accent-cyan text-dark-bg shadow-[0_2px_10px_rgba(0,212,255,0.3)]"
                  : "bg-transparent text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text"
                }
              `}
            >
              Admin
            </button>
          </div>

          <button
            onClick={() => dispatch(toggleTheme())}
            className={ToggleThemeButtonClass}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <HiSun className="w-[15px] h-[15px] sm:w-[17px] sm:h-[17px]" /> : <HiMoon className="w-[15px] h-[15px] sm:w-[17px] sm:h-[17px]" />}
          </button>

          
          <div className={`
            w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center
            text-[11px] sm:text-[13px] font-extrabold text-dark-bg select-none
            cursor-pointer hover:scale-105 transition-transform duration-150
            ${isAdmin
              ? "bg-gradient-to-br from-accent-amber to-[#ff6b35]"
              : "bg-gradient-to-br from-accent-cyan to-accent-violet"
            }
          `}>
            {isAdmin ? "A" : "V"}
          </div>

        </div>
      </header>

      
      <Drawer
        open={isMobile}
        onClose={() => setIsMobile(false)}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: 240,
            background: "var(--drawer-bg)",
            borderRight: "1px solid var(--drawer-border)",
          },
        }}
      >
        <Sidebar onClose={() => setIsMobile(false)} />
      </Drawer>
    </>
  );
}