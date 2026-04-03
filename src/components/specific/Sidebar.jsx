import { Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { MdOutlineExitToApp,MdDashboardCustomize,MdManageAccounts,MdGroups } from "react-icons/md"
import { motion } from "framer-motion";

const adminTabs = [
    { name: "Dashboard", path: "/dashboard", icon: <MdDashboardCustomize /> },
    { name: "Transactions", path: "/transactions", icon: <MdManageAccounts /> },
    { name: "Insights", path: "/insights", icon: <MdGroups /> },
];

const Sidebar = ({ onClose }) => {
    const location = useLocation();
    //   const [adminLogout] = useLazyAdminLogoutQuery(); // we will change

    const logoutHandler = async () => {
        const toastId = toast.loading("Logging out...");
        setTimeout(() => {
            toast.success("Logout successful!", { id: toastId });
        }, 1000);
        //   dispatch(adminNotExists());
    };

    return (
        <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: "24px 16px" }}>

            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32, paddingLeft: 8 }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg, #63dcbe, #e05c7a)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <img src="./public/ZorvynLogo.jpg" alt="Z" />
                </div>
                <div>
                    <p style={{ color: "#e8eaf0", fontWeight: 700, fontSize: 16, margin: 0, fontFamily: "'Syne',sans-serif" }}>Zorvyn</p>
                    <p style={{ color: "#5a607a", fontSize: 10, margin: 0, fontFamily: "'DM Mono',monospace",letterSpacing: "0.08em" }}>A Fintech Company</p>
                </div>
            </div>


            <nav style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
                {adminTabs.map((tab, i) => {
                    const isActive = location.pathname === tab.path;
                    return (
                        <motion.div key={tab.path} whileHover={{ x: 2 }} transition={{ type: "spring", stiffness: 400 }}>
                            <Link
                                to={tab.path}
                                onClick={onClose}
                                style={{
                                    display: "flex", alignItems: "center", gap: 12,
                                    padding: "10px 14px", borderRadius: 12,
                                    textDecoration: "none", transition: "background 0.15s",
                                    background: isActive ? "rgba(99,220,190,0.12)" : "transparent",
                                    color: isActive ? "#63dcbe" : "#8890a8",
                                    fontFamily: "'Syne',sans-serif", fontWeight: isActive ? 700 : 500,
                                    fontSize: 14, border: isActive ? "1px solid rgba(99,220,190,0.2)" : "1px solid transparent",
                                }}
                            >
                                <span style={{ fontSize: 18, display: "flex" }}>{tab.icon}</span>
                                {tab.name}
                            </Link>
                        </motion.div>
                    );
                })}
            </nav>


            <button
                onClick={logoutHandler}
                style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "10px 14px", borderRadius: 12, border: "1px solid rgba(224,92,122,0.15)",
                    background: "transparent", color: "#e05c7a", cursor: "pointer",
                    fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: 14, width: "100%",
                    transition: "background 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(224,92,122,0.08)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
                <MdOutlineExitToApp style={{ fontSize: 18 }} />
                Logout
            </button>
        </div>
    );
};

export default Sidebar