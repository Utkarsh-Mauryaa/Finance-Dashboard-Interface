import Sidebar from "../specific/Sidebar";
import { globalStyles } from "../../theme";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />

      <style>{globalStyles}</style>
      <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "#0d0f14" }}>

        {/* Desktop sidebar */}
        <aside
          style={{
            width: 230,
            flexShrink: 0,
            borderRight: "1px solid #1e2330",
            background: "#13161e",
            display: "none",
            overflowY: "auto",
          }}
          className="admin-sidebar"
        >
          <style>{`@media(min-width:769px){.admin-sidebar{display:block!important}}`}</style>
          <Sidebar />
        </aside>

        {/* Main content */}
        <main style={{ flex: 1, overflowY: "auto", background: "#0d0f14" }}>
          <div style={{ padding: "24px", minHeight: "100%" }}>
            {children}
          </div>
        </main>

      </div>
    </>
  );
};

export default Layout;