import { format, subMonths } from "date-fns";

export const getLast6Months = () => {
  const currentDate = new Date();
  const last6Months = [];
  for (let i = 0; i < 6; i++) {
    const monthDate = subMonths(currentDate, i);
    last6Months.unshift(format(monthDate, "MMMM"));
  }
  return last6Months;
};

export const getFormattedLast6Months = () => {
  const currentDate = new Date();
  const last6Months = [];
  for (let i = 0; i < 6; i++) {
    const monthDate = subMonths(currentDate, i);
    last6Months.unshift(format(monthDate, "MMM"));
  }
  return last6Months;
};

// ─────────────────────────────────────────────────────────────────────────────
// getCategoryStats
//
// Previously: sortedCategories used BREAKDOWN values (static hardcoded numbers)
//             and categoryTotals was computed from monthlyData separately —
//             the two were never connected.
//
// Now: values come entirely from monthlyData by summing each category across
//      all months. BREAKDOWN is only used for the color of each category.
//      So the progress bar widths, percentages, and top-category insight card
//      all reflect the bar chart data exactly.
// ─────────────────────────────────────────────────────────────────────────────
export const getCategoryStats = (categories=[], breakdown=[], monthlyData=[]) => {
  // Sum each category across every month in monthlyData
  const categoryTotals = categories?.reduce((acc, cat) => {
    acc[cat] = monthlyData?.reduce((s, m) => s + (m[cat] ?? 0), 0);
    return acc;
  }, {});

  // Build sortedCategories using monthlyData totals + colors from BREAKDOWN
  const colorMap = breakdown?.reduce((acc, item) => {
    acc[item.label] = item.color;
    return acc;
  }, {});

  const sortedCategories = categories?.map((cat) => ({
      label: cat,
      value: categoryTotals[cat],          // ← monthly total, not BREAKDOWN value
      color: colorMap[cat] ?? "#888",
    })).sort((a, b) => b.value - a.value);

  const topCategory      = monthlyData.length === 0 ? "No Data" : sortedCategories[0];
  const topCategoryTotal = topCategory.value; // already the monthly sum

  return { sortedCategories, topCategory, topCategoryTotal };
};

export const getMonthlyChange = (categories=[], monthlyData=[]) => {
  if (!monthlyData || monthlyData.length < 2) return 0;
  const lastMonth = monthlyData[monthlyData.length - 1];
  const prevMonth = monthlyData[monthlyData.length - 2];
  const lastTotal = categories?.reduce((s, c) => s + (lastMonth[c] ?? 0), 0);
  const prevTotal = categories?.reduce((s, c) => s + (prevMonth[c] ?? 0), 0);
  return prevTotal > 0 ? Math.round(((lastTotal - prevTotal) / prevTotal) * 100) : 0;
};

export const getTotalIncome = (transactions = []) =>
  transactions?.filter((t) => t.type === "Income").reduce((s, t) => s + t.amount, 0);

export const getTotalExpense = (transactions = []) =>
  transactions?.filter((t) => t.type === "Expense").reduce((s, t) => s + t.amount, 0);

export const getSavings = (transactions = []) =>
  getTotalIncome(transactions) - getTotalExpense(transactions);