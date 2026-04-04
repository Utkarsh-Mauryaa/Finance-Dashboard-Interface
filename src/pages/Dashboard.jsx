import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { BsCurrencyDollar } from "react-icons/bs";
import { MdGroups } from "react-icons/md";
import Layout from "../components/layout/Layout";
import { LayoutLoaderDashboard } from "../components/layout/Loaders";
import ActionCard from "../components/specific/ActionCard";
import { DoughnutChart, LineChart } from "../components/specific/Charts";
import { getCategoryStats, getSavings, getTotalExpense, getTotalIncome } from "../lib/features";
import { CATEGORIES, CATEGORY_COLORS, expense, income, MONTHLY_CATEGORY_DATA, transactionData } from "../utils/sampleData";

const fmt = (n) =>
  n.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

const totalIncome  = getTotalIncome(transactionData);
const totalExpense = getTotalExpense(transactionData);
const savings      = getSavings(transactionData);

const { sortedCategories } = getCategoryStats(CATEGORIES, CATEGORY_COLORS, MONTHLY_CATEGORY_DATA);
const doughnutTotal = sortedCategories.reduce((s, cat) => s + cat.value, 0);

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const actionCardData = [
    {
      title: "Total Income",
      value: fmt(totalIncome),
      icon: <MdGroups />,
      color: "#63dcbe",
      glow: "rgba(99,220,190,0.15)",
      sub: "all income transactions",
    },
    {
      title: "Total Expenses",
      value: fmt(totalExpense),
      icon: <BiSolidMessageSquareDetail />,
      color: "#e05c7a",
      glow: "rgba(224,92,122,0.15)",
      sub: "all expense transactions",
    },
    {
      title: "Savings",
      value: (savings < 0 ? "−" : "") + fmt(Math.abs(savings)),
      icon: <BsCurrencyDollar />,
      color: savings >= 0 ? "#3bb8f5" : "#e05c7a",
      glow: savings >= 0 ? "rgba(59,184,245,0.15)" : "rgba(224,92,122,0.15)",
      sub: savings >= 0 ? "income minus expenses" : "expenses exceed income",
    },
  ];

  const ActionCards = (
    <div className="flex gap-3 sm:gap-4 flex-wrap mt-2">
      {actionCardData.map((w, i) => (
        <motion.div
          key={w.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex-[1_1_200px] min-w-[140px] sm:min-w-[180px]"
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
      <div className="max-w-[1200px]">

        <div className="flex flex-col min-[899px]:flex-row gap-4 sm:gap-5 mb-6">

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="
              w-full sm:flex-[1_1_400px] min-w-0 h-[330px] sm:h-[350px]
              bg-light-surface dark:bg-dark-surface
              border border-light-border dark:border-dark-border
              rounded-2xl p-4 sm:p-5
              transition-colors duration-300
            "
          >
            <p className="text-light-subtle dark:text-dark-subtle font-['Roboto_Mono'] text-[13px] uppercase tracking-[0.08em] mb-3">
              Balance Trend
            </p>
            <LineChart income={income} expense={expense} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="
              w-full sm:flex-[1_1_340px] min-w-0 sm:h-[350px]
              flex flex-col sm:overflow-hidden
              bg-light-surface dark:bg-dark-surface
              border border-light-border dark:border-dark-border
              rounded-2xl p-4 pb-6 sm:p-5
              transition-colors duration-300
            "
          >
            <p className="text-light-subtle dark:text-dark-subtle font-['Roboto_Mono'] text-[13px] uppercase tracking-[0.08em] mb-4 shrink-0">
              Spending Breakdown
            </p>

            <div className="flex-1 flex flex-col sm:flex-row items-center gap-3 sm:gap-5 min-h-0">

              <div className="flex-1 min-w-0 flex flex-col justify-center gap-0.5 w-full sm:w-auto">
                {sortedCategories.map((item) => {
                  const pct = doughnutTotal > 0 ? Math.round((item.value / doughnutTotal) * 100) : 0;
                  return (
                    <div
                      key={item.label}
                      className="flex items-center gap-2.5 py-1.5 w-full sm:w-[70%]"
                      style={{ borderBottom: "1px solid var(--border)" }}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-[3px] shrink-0"
                        style={{ background: item.color }}
                      />
                      <span className="flex-1 text-light-text dark:text-dark-text font-['Roboto'] text-[13px] truncate min-[899px]:max-[1010px]:hidden">
                        {item.label}
                      </span>
                      <span className="text-light-subtle dark:text-dark-subtle font-['Roboto_Mono'] text-[12px] shrink-0">
                        {pct}%
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="w-[130px] h-[130px] sm:w-[190px] sm:h-[190px] shrink-0 flex items-center justify-center">
                <DoughnutChart
                  labels={sortedCategories.map((i) => i.label)}
                  value={sortedCategories.map((i) => i.value)}
                />
              </div>
            </div>
          </motion.div>

        </div>

        {ActionCards}

      </div>
    </Layout>
  );
};

export default Dashboard;