import { v4 as uuidv4 } from "uuid";

export const income = [15000, 20000, 45829, 67343, 34500, 98000];
export const expense = [40000, 53400, 67000, 34000, 90000, 16000];


export const MONTHLY_CATEGORY_DATA = [
  { month: "Oct", "Food & Dining": 8200, Transport: 3100, Shopping: 12000, Entertainment: 4500, Health: 2200, Utilities: 3800 },
  { month: "Nov", "Food & Dining": 9500, Transport: 2800, Shopping: 18000, Entertainment: 6200, Health: 1800, Utilities: 4100 },
  { month: "Dec", "Food & Dining": 14000, Transport: 4200, Shopping: 28000, Entertainment: 9800, Health: 3100, Utilities: 5200 },
  { month: "Jan", "Food & Dining": 7800, Transport: 2600, Shopping: 9500, Entertainment: 3200, Health: 4500, Utilities: 3600 },
  { month: "Feb", "Food & Dining": 8900, Transport: 3300, Shopping: 11000, Entertainment: 5100, Health: 2900, Utilities: 3900 },
  { month: "Mar", "Food & Dining": 10200, Transport: 3800, Shopping: 15500, Entertainment: 7300, Health: 3600, Utilities: 4400 },
];


export const CATEGORY_COLORS = {
  "Food & Dining": "rgba(248, 245, 101, 0.85)",
  "Transport": "rgba(0, 68, 255, 0.8)",
  "Shopping": "rgba(248, 43, 255, 0.8)",
  "Entertainment": "rgba(244, 18, 18, 0.8)",
  "Health": "rgba(42, 250, 23, 0.8)",
  "Utilities": "rgba(220, 120, 5, 0.8)",
};

export const CATEGORIES = Object.keys(CATEGORY_COLORS);

export const transactionData = [
  {
    id: uuidv4().split("-")[0],
    date: "2026-04-04",
    amount: 15430,
    category: "Food & Dining",
    type: "Income",
  },
  {
    id: uuidv4().split("-")[0],
    date: "2025-12-06",
    amount: 19430,
    category: "Entertainment",
    type: "Expense",
  },
  {
    id: uuidv4().split("-")[0],
    date: "2026-02-18",
    amount: 20030,
    category: "Transport",
    type: "Expense",
  },
  {
    id: uuidv4().split("-")[0],
    date: "2026-01-27",
    amount: 7830,
    category: "Shopping",
    type: "Income",
  },
  {
    id: uuidv4().split("-")[0],
    date: "2025-12-07",
    amount: 34030,
    category: "Health",
    type: "Income",
  },
  {
    id: uuidv4().split("-")[0],
    date: "2026-03-23",
    amount: 6830,
    category: "Utilities",
    type: "Expense",
  },
  {
    id: uuidv4().split("-")[0],
    date: "2024-03-08",
    amount: 45030,
    category: "Shopping",
    type: "Expense",
  },
]