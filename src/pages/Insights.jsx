import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { LayoutLoaderInsights } from "../components/layout/Loaders";
import { BarChart } from "../components/specific/Charts";
import InsightCard from "../components/specific/InsightCard";
import { CATEGORIES, CATEGORY_COLORS, MONTHLY_CATEGORY_DATA } from "../utils/sampleData";
import { getCategoryStats, getMonthlyChange } from "../lib/features";

const fmt = (n) =>
  !n ? "No Data" : n?.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

const { sortedCategories, topCategory, topCategoryTotal } = getCategoryStats(
  CATEGORIES,
  CATEGORY_COLORS,
  MONTHLY_CATEGORY_DATA
);
const momChange = getMonthlyChange(CATEGORIES, MONTHLY_CATEGORY_DATA);

const momColor = momChange > 10 ? "#e05c7a" : momChange > 0 ? "#ffa31a" : "#3bb8f5";
const momGlow  = momChange > 10 ? "rgba(224,92,122,0.15)" : momChange > 0 ? "rgba(255,163,26,0.15)" : "rgba(59,184,245,0.15)";

const insightCards = [
  {
    icon: "🏆",
    label: "Highest Spending Category",
    value: topCategory.label,
    sub: `${fmt(topCategoryTotal)} total across 6 months`,
    color: "#ffa31a",
    glow: "rgba(255,163,26,0.15)",
  },
  {
    icon: "📈",
    label: "Month-over-Month",
    value: `${momChange > 0 ? "+" : ""}${momChange}%`,
    sub: `Spending ${momChange > 0 ? "increased" : "decreased"} vs last month`,
    color: momColor,
    glow: momGlow,
  },
];

function Insights() {
  const [isLoading, setIsLoading] = useState(true);
  const breakdownTotal = sortedCategories.reduce((s, cat) => s + cat.value, 0);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  if (isLoading) {
    return (
      <Layout>
        <LayoutLoaderInsights />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-[1200px]">

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mb-6">

          
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="w-full sm:flex-[1_1_420px] min-w-0 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-2xl p-4 sm:p-5 transition-colors duration-300"
          >
            <p className="text-light-subtle dark:text-dark-subtle font-['Roboto_Mono'] text-[13px] uppercase tracking-[0.08em] mb-1">
              Monthly Comparison
            </p>
            <p className="text-light-subtle/50 dark:text-dark-subtle/50 font-['Roboto_Mono'] text-[12px] mb-4">
              Spending per category over last 6 months
            </p>
            <div className="flex flex-wrap gap-x-3.5 gap-y-1.5 mb-4">
              {CATEGORIES.map((cat) => (
                <div key={cat} className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-[2px] inline-block shrink-0" style={{ background: CATEGORY_COLORS[cat] }} />
                  <span className="text-[12px] text-light-subtle dark:text-dark-subtle font-['Roboto_Mono']">{cat}</span>
                </div>
              ))}
            </div>
            <BarChart />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="w-full sm:flex-[1_1_300px] min-w-0 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-2xl p-4 sm:p-5 transition-colors duration-300"
          >
            <p className="text-light-subtle dark:text-dark-subtle font-['Roboto_Mono'] text-[13px] uppercase tracking-[0.08em] mb-1">
              Category Breakdown
            </p>
            <p className="text-light-subtle/50 dark:text-dark-subtle/50 font-['Roboto_Mono'] text-[12px] mb-5">
              Share of total spending
            </p>
            <div className="flex flex-col gap-3.5">
              {sortedCategories.map((cat, i) => {
                const pct    = breakdownTotal > 0 ? Math.round((cat.value / breakdownTotal) * 100) : 0;
                const relPct = sortedCategories[0].value > 0 ? Math.round((cat.value / sortedCategories[0].value) * 100) : 0;
                return (
                  <motion.div
                    key={cat.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.06 }}
                  >
                    <div className="flex justify-between items-center mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-[9px] h-[9px] rounded-[2px] shrink-0 inline-block" style={{ background: cat.color }} />
                        <span className="text-[14px] text-light-text dark:text-dark-text font-['Roboto'] font-medium">{cat.label}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <span className="text-[13px] font-bold text-light-text dark:text-dark-text font-['Roboto_Mono']">{fmt(cat.value)}</span>
                        <span className="text-[12px] text-light-subtle dark:text-dark-subtle font-['Roboto_Mono'] min-w-[32px] text-right">{pct}%</span>
                      </div>
                    </div>
                    <div className="h-1.5 bg-light-border dark:bg-dark-border rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${relPct}%` }}
                        transition={{ duration: 0.8, delay: 0.3 + i * 0.06, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ background: cat.color }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

        </div>

        
        <div className="flex gap-3 sm:gap-4 flex-wrap">
          {insightCards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex-[1_1_220px] min-w-[180px] sm:min-w-[200px]"
            >
              <InsightCard {...card} />
            </motion.div>
          ))}
        </div>

      </div>
    </Layout>
  );
}

export default Insights;