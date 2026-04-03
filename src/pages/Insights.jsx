import { motion } from "framer-motion";
import { TbCategory, TbTrendingUp } from "react-icons/tb";
import { MdOutlineSavings } from "react-icons/md";
import Layout from "../components/layout/Layout";
import { BarChart } from "../components/specific/Charts";
import InsightCard from "../components/specific/InsightCard";
import {
  BREAKDOWN,
  CATEGORIES,
  CATEGORY_COLORS,
  MONTHLY_CATEGORY_DATA,
  expense,
  income,
} from "../utils/sampleData";

// ── helpers ───────────────────────────────────────────────────────────────────
const cardStyle = {
  background: "#13161e",
  border: "1px solid #1e2330",
  borderRadius: 16,
  padding: 20,
  boxShadow: "none",
};

const fmt = (n) =>
  n.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

// ── derive insights from data ─────────────────────────────────────────────────

// total per category across all months
const categoryTotals = CATEGORIES.reduce((acc, cat) => {
  acc[cat] = MONTHLY_CATEGORY_DATA.reduce((s, m) => s + (m[cat] ?? 0), 0);
  return acc;
}, {});

const sortedCategories = [...BREAKDOWN].sort((a, b) => b.value - a.value);
const topCategory      = sortedCategories[0];
const topCategoryTotal = categoryTotals[topCategory.label] ?? topCategory.value;

// month-over-month change for last 2 months (total spending)
const lastMonth = MONTHLY_CATEGORY_DATA[MONTHLY_CATEGORY_DATA.length - 1];
const prevMonth = MONTHLY_CATEGORY_DATA[MONTHLY_CATEGORY_DATA.length - 2];
const lastTotal = CATEGORIES.reduce((s, c) => s + (lastMonth[c] ?? 0), 0);
const prevTotal = CATEGORIES.reduce((s, c) => s + (prevMonth[c] ?? 0), 0);
const momChange = prevTotal > 0 ? Math.round(((lastTotal - prevTotal) / prevTotal) * 100) : 0;

// savings rate (last 6 months)
const totalIncome  = income.reduce((s, v) => s + v, 0);
const totalExpense = expense.reduce((s, v) => s + v, 0);
const savingsRate  = totalIncome > 0 ? Math.round(((totalIncome - totalExpense) / totalIncome) * 100) : 0;

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
    color: momChange > 10 ? "#e05c7a" : momChange > 0 ? "#ffa31a" : "#63dcbe",
    glow: momChange > 10
      ? "rgba(224,92,122,0.15)"
      : momChange > 0
        ? "rgba(255,163,26,0.15)"
        : "rgba(99,220,190,0.15)",
  },
  {
    icon: "💰",
    label: "Savings Rate",
    value: `${savingsRate}%`,
    sub: savingsRate > 30
      ? "Excellent savings habit — keep it up!"
      : savingsRate > 10
        ? "Decent savings — room to improve"
        : "High spending — consider cutting back",
    color: savingsRate > 30 ? "#63dcbe" : savingsRate > 10 ? "#ffa31a" : "#e05c7a",
    glow: savingsRate > 30
      ? "rgba(99,220,190,0.15)"
      : savingsRate > 10
        ? "rgba(255,163,26,0.15)"
        : "rgba(224,92,122,0.15)",
  },
];

// ── component ─────────────────────────────────────────────────────────────────
function Insights() {
  const breakdownTotal = BREAKDOWN.reduce((s, i) => s + i.value, 0);

  return (
    <Layout>
      <div style={{ maxWidth: 1200 }}>

        {/* ── row 1: bar chart + category breakdown ── */}
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 24 }}>

          {/* Monthly comparison bar chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ ...cardStyle, flex: "1 1 420px", minWidth: 0 }}
          >
            <p style={{
              color: "#8890a8", fontFamily: "'DM Mono', monospace",
              fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4,
            }}>
              Monthly Comparison
            </p>
            <p style={{
              color: "#3a4260", fontFamily: "'DM Mono', monospace",
              fontSize: 11, marginBottom: 16,
            }}>
              Spending per category over last 6 months
            </p>

            {/* custom legend */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 14px", marginBottom: 16 }}>
              {CATEGORIES.map((cat) => (
                <div key={cat} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{
                    width: 8, height: 8, borderRadius: 2,
                    background: CATEGORY_COLORS[cat],
                    display: "inline-block", flexShrink: 0,
                  }} />
                  <span style={{
                    fontSize: 11, color: "#5a607a",
                    fontFamily: "'DM Mono', monospace",
                  }}>
                    {cat}
                  </span>
                </div>
              ))}
            </div>

            <BarChart />
          </motion.div>

          {/* Category breakdown progress bars */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ ...cardStyle, flex: "1 1 300px", minWidth: 0 }}
          >
            <p style={{
              color: "#8890a8", fontFamily: "'DM Mono', monospace",
              fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4,
            }}>
              Category Breakdown
            </p>
            <p style={{
              color: "#3a4260", fontFamily: "'DM Mono', monospace",
              fontSize: 11, marginBottom: 20,
            }}>
              Share of total spending
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {sortedCategories.map((cat, i) => {
                const pct = breakdownTotal > 0
                  ? Math.round((cat.value / breakdownTotal) * 100)
                  : 0;
                const relPct = sortedCategories[0].value > 0
                  ? Math.round((cat.value / sortedCategories[0].value) * 100)
                  : 0;

                return (
                  <motion.div
                    key={cat.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.06 }}
                  >
                    {/* label row */}
                    <div style={{
                      display: "flex", justifyContent: "space-between",
                      alignItems: "center", marginBottom: 6,
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{
                          width: 9, height: 9, borderRadius: 2,
                          background: cat.color, flexShrink: 0, display: "inline-block",
                        }} />
                        <span style={{
                          fontSize: 13, color: "#c8cedd",
                          fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
                        }}>
                          {cat.label}
                        </span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{
                          fontSize: 12, fontWeight: 700, color: "#e8eaf0",
                          fontFamily: "'DM Mono', monospace",
                        }}>
                          {fmt(cat.value)}
                        </span>
                        <span style={{
                          fontSize: 11, color: "#5a607a",
                          fontFamily: "'DM Mono', monospace", minWidth: 32, textAlign: "right",
                        }}>
                          {pct}%
                        </span>
                      </div>
                    </div>

                    {/* progress bar */}
                    <div style={{
                      height: 6, background: "#1e2330",
                      borderRadius: 3, overflow: "hidden",
                    }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${relPct}%` }}
                        transition={{ duration: 0.8, delay: 0.3 + i * 0.06, ease: "easeOut" }}
                        style={{
                          height: "100%",
                          borderRadius: 3,
                          background: cat.color,
                        }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

        </div>

        {/* ── row 2: insight cards ── */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {insightCards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ flex: "1 1 220px", minWidth: 200 }}
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