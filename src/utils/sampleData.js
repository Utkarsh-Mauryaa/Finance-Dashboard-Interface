// simple arrays used by LineChart
export const income  = [15000, 20000, 45829, 67343, 34500, 98000];
export const expense = [40000, 53400, 67000, 34000, 90000, 16000];

// doughnut / category breakdown (Dashboard)
export const BREAKDOWN = [
  { label: "Food & Dining", value: 100000, color: "rgba(248, 245, 101, 0.95)" },
  { label: "Transport",     value: 200000, color: "rgba(0, 68, 255, 0.8)"     },
  { label: "Shopping",      value: 300000, color: "rgba(248, 43, 255, 0.8)"   },
  { label: "Entertainment", value: 400000, color: "rgba(244, 18, 18, 0.8)"    },
  { label: "Health",        value: 500000, color: "rgba(42, 250, 23, 0.8)"    },
  { label: "Utilities",     value: 600000, color: "rgba(220, 120, 5, 0.8)"    },
];

// transactions (Transactions page)
export const TRANSACTIONS = [
  { id: 1, date: "2022-01-01", amount: 1000,  category: "Food",          type: "Income"  },
  { id: 2, date: "2022-01-02", amount: 2000,  category: "Health",        type: "Expense" },
  { id: 3, date: "2022-01-07", amount: 2500,  category: "Entertainment", type: "Expense" },
  { id: 4, date: "2022-01-05", amount: 1500,  category: "Shopping",      type: "Income"  },
  { id: 5, date: "2022-01-03", amount: 500,   category: "Utilities",     type: "Expense" },
];

// monthly spending per category — used by BarChart & Insights
export const MONTHLY_CATEGORY_DATA = [
  { month: "Oct",  "Food & Dining": 8200,  Transport: 3100, Shopping: 12000, Entertainment: 4500, Health: 2200, Utilities: 3800 },
  { month: "Nov",  "Food & Dining": 9500,  Transport: 2800, Shopping: 18000, Entertainment: 6200, Health: 1800, Utilities: 4100 },
  { month: "Dec",  "Food & Dining": 14000, Transport: 4200, Shopping: 28000, Entertainment: 9800, Health: 3100, Utilities: 5200 },
  { month: "Jan",  "Food & Dining": 7800,  Transport: 2600, Shopping: 9500,  Entertainment: 3200, Health: 4500, Utilities: 3600 },
  { month: "Feb",  "Food & Dining": 8900,  Transport: 3300, Shopping: 11000, Entertainment: 5100, Health: 2900, Utilities: 3900 },
  { month: "Mar",  "Food & Dining": 10200, Transport: 3800, Shopping: 15500, Entertainment: 7300, Health: 3600, Utilities: 4400 },
];


export const CATEGORY_COLORS = {
  "Food & Dining": "rgba(248, 245, 101, 0.85)",
  "Transport":     "rgba(0, 68, 255, 0.8)",
  "Shopping":      "rgba(248, 43, 255, 0.8)",
  "Entertainment": "rgba(244, 18, 18, 0.8)",
  "Health":        "rgba(42, 250, 23, 0.8)",
  "Utilities":     "rgba(220, 120, 5, 0.8)",
};

export const CATEGORIES = Object.keys(CATEGORY_COLORS);