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

export const getCategoryStats = (categories=[], colors={}, monthlyData=[]) => {

  const categoryTotals = categories?.reduce((acc, cat) => {
    acc[cat] = monthlyData?.reduce((s, m) => s + (m[cat] ?? 0), 0);
    return acc;
  }, {});

  const sortedCategories = categories?.map((cat) => ({
      label: cat,
      value: categoryTotals[cat],          
      color: colors[cat] ?? "#888",
    })).sort((a, b) => b.value - a.value);

  const topCategory      = monthlyData.length === 0 ? "No Data" : sortedCategories[0];
  const topCategoryTotal = topCategory?.value ?? 0; 

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