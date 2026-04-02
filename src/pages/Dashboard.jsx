import { Container, Paper, Typography } from "@mui/material";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { MdAdminPanelSettings, MdGroups } from "react-icons/md";
import { LayoutLoaderDashboard } from "../components/layout/Loaders";
import { DoughnutChart, LineChart } from "../components/specific/Charts"
import { useState } from "react";
import Layout from "../components/layout/Layout";
import ActionCard from "../components/specific/ActionCard";
import { BsCurrencyDollar } from "react-icons/bs";
import { expense, income } from "../utils/sampleData";

const cardStyle = {
  background: "#13161e",
  border: "1px solid #1e2330",
  borderRadius: 16,
  padding: 20,
  boxShadow: "none",
};

const Dashboard = () => {
  // const { isLoading, data, error, isError } = useAdminStatsQuery("", { pollingInterval: 5000 });
  // const { stats } = data || {};

  // useErrors([{ isError, error }]);
  const [isLoading, setIsLoading] = useState(false);

  const Appbar = (
    <div style={{ ...cardStyle, marginBottom: 24, display: "flex", alignItems: "center", gap: 12, padding: "28px 24px" }}>
      <MdAdminPanelSettings style={{ fontSize: 36, color: "#63dcbe", flexShrink: 0 }} />

      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <span style={{
          color: "#e8eaf0",
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: 22,
          lineHeight: 1.2,
        }}>
          Welcome back, Admin
        </span>
        <span style={{
          color: "#5a607a",
          fontFamily: "'DM Mono', monospace",
          fontSize: 12,
        }}>
          {format(new Date(), "EEEE, d MMMM yyyy")}
        </span>
      </div>

      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          background: "#63dcbe18",
          border: "1px solid #63dcbe33",
          borderRadius: 8,
          padding: "4px 12px",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}>
          <span style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "#63dcbe",
            display: "inline-block",
          }} />
          <span style={{
            color: "#63dcbe",
            fontFamily: "'DM Mono', monospace",
            fontSize: 11,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}>
            Online
          </span>
        </div>
        <IoMdNotifications style={{ fontSize: 22, color: "#5a607a", flexShrink: 0 }} />
      </div>
    </div>
  );

  const ActionCards = (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 8 }}>
      {[
        { title: "Net Balance", value: (101000).toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }), icon: <BsCurrencyDollar />, color: "#63dcbe" },
        { title: "Total Income", value: (200000).toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }), icon: <MdGroups />, color: "#e05c7a" },
        { title: "Total Expenses", value: (100000).toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }), icon: <BiSolidMessageSquareDetail />, color: "#a78bfa" },
        { title: "Total Expenses", value: (100000).toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }), icon: <BiSolidMessageSquareDetail />, color: "#a78bfa" },
      ].map((w, i) => (
        <motion.div
          key={w.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ flex: "1 1 200px", minWidth: 180 }}
        >
          <ActionCard {...w} />
        </motion.div>
      ))}
    </div>
  );

  return isLoading ? (
    <LayoutLoaderDashboard />
  ) : (
    <Layout>
      <div style={{ maxWidth: 1200 }}>
        {/* {Appbar} */}


        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 24 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ ...cardStyle, flex: "1 1 400px", minWidth: 0, height: 350 }}
          >
            <p style={{ color: "#8890a8", fontFamily: "'DM Mono',monospace", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>
              Balance-Trend
            </p>
            <LineChart income={income} expense={expense} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              ...cardStyle,
              flex: "1 1 300px",
              maxWidth: "100%",
              height: 350,
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative",
            }}
          >
            <DoughnutChart
              labels={["Food & Dining","Transport", "Shopping", "Entertainment", "Health", "Utilities"]}
              value={[100000, 200000, 300000, 400000, 500000, 600000]}
            />
            <div style={{
              position: "absolute", display: "flex", left:"295px",
              gap: 6, pointerEvents: "none", border: "2px solid red",
            }}>
              
              <span className="flex flex-col border-2">
                <p>Total Expenses</p>
                <p className="m-auto">₹100000</p>
              </span>
              
            </div>
          </motion.div>
        </div>

        {ActionCards}
        {/* action cards */}
      </div>
    </Layout>
  );
};


export default Dashboard;