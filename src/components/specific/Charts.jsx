import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { getLast6Months } from "../../lib/features";
import { CATEGORIES, CATEGORY_COLORS, MONTHLY_CATEGORY_DATA } from "../../utils/sampleData";

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, Title, Tooltip, Legend, Filler, ArcElement,
);

const labels = getLast6Months();

const tooltipBase = {
  backgroundColor: "#13161e",
  borderColor: "#1e2330",
  borderWidth: 1,
  titleColor: "#e8eaf0",
  bodyColor: "#8890a8",
  titleFont: { family: "Roboto", weight: "700" },
  bodyFont: { family: "Roboto Mono" },
  padding: 10,
  cornerRadius: 8,
};


const lineChartOptions = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: false },
    tooltip: {
      ...tooltipBase,
      callbacks: {
        label: (ctx) => {
          let l = ctx.dataset.label ? ctx.dataset.label + ": " : "";
          if (ctx.parsed.y !== null) l += "₹" + ctx.parsed.y.toLocaleString("en-IN");
          return l;
        },
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      border: { color: "#1e2330" },
      ticks: { color: "#5a607a", font: { family: "Roboto Mono", size: 12 } },
    },
    y: {
      grid: { color: "rgba(255,255,255,0.04)", drawBorder: false },
      border: { display: false },
      min: 0, max: 100000,
      ticks: {
        color: "#5a607a",
        font: { family: "Roboto Mono", size: 12 },
        stepSize: 25000,
        callback: (v) => {
          if (v === 0) return "₹0";
          if (v === 100000) return "1.0L";
          return (v / 1000).toFixed(1) + "k";
        },
      },
    },
  },
};

export const LineChart = ({ income = [], expense = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        label: "Income",
        data: income,
        fill: true,
        backgroundColor: "rgba(99,220,190,0.08)",
        borderColor: "#63dcbe",
        borderWidth: 2, tension: 0.4,
        pointBackgroundColor: "#63dcbe",
        pointBorderColor: "#0d0f14",
        pointBorderWidth: 2, pointRadius: 4, pointHoverRadius: 6,
      },
      {
        label: "Expense",
        data: expense,
        fill: true,
        backgroundColor: "rgba(249,49,85,0.08)",
        borderColor: "#f93155",
        borderWidth: 2, tension: 0.4,
        pointBackgroundColor: "#f93155",
        pointBorderColor: "#0d0f14",
        pointBorderWidth: 2, pointRadius: 4, pointHoverRadius: 6,
      },
    ],
  };
  return <div style={{ height: 260 }}><Line data={data} options={lineChartOptions} /></div>;
};


const doughnutChartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: { legend: { display: false }, tooltip: { ...tooltipBase } },
  cutout: "76%",
};

export const DoughnutChart = ({ value = [], labels = [] }) => {
  const data = {
    labels,
    datasets: [{
      data: value,
      backgroundColor: [
        "rgba(248, 245, 101, 0.95)", "rgba(0, 68, 255, 0.8)",
        "rgba(248, 43, 255, 0.8)",   "rgba(244, 18, 18, 0.8)",
        "rgba(42, 250, 23, 0.8)",    "rgba(220, 120, 5, 0.8)",
      ],
      borderColor: [
        "rgba(248, 245, 101, 0.95)", "rgba(0, 68, 255, 0.8)",
        "rgba(248, 43, 255, 0.8)",   "rgba(244, 18, 18, 0.8)",
        "rgba(42, 250, 23, 0.8)",    "rgba(220, 120, 5, 0.8)",
      ],
      borderWidth: 2,
      hoverOffset: 6,
      hoverBackgroundColor: [
        "rgba(248, 247, 189, 0.95)", "rgba(111, 150, 255, 0.8)",
        "rgba(252, 164, 255, 0.8)",  "rgba(255, 118, 118, 0.8)",
        "rgba(169, 255, 161, 0.8)",  "rgba(255, 174, 81, 0.8)",
      ],
    }],
  };
  return <Doughnut data={data} options={doughnutChartOptions} />;
};

const barChartOptions = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: {
      ...tooltipBase,
      callbacks: {
        label: (ctx) => ` ${ctx.dataset.label}: ₹${ctx.parsed.y.toLocaleString("en-IN")}`,
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      border: { color: "#1e2330" },
      ticks: { color: "#5a607a", font: { family: "Roboto Mono", size: 12 } },
    },
    y: {
      grid: { color: "rgba(255,255,255,0.04)" },
      border: { display: false },
      ticks: {
        color: "#5a607a",
        font: { family: "Roboto Mono", size: 12 },
        callback: (v) => v >= 1000 ? (v / 1000).toFixed(0) + "k" : v,
      },
    },
  },
  borderRadius: 4,
  barPercentage: 0.7,
  categoryPercentage: 0.8,
};

export const BarChart = () => {
  const monthLabels = MONTHLY_CATEGORY_DATA.map((d) => d.month);
  const datasets = CATEGORIES.map((cat) => ({
    label: cat,
    data: MONTHLY_CATEGORY_DATA.map((d) => d[cat] ?? 0),
    backgroundColor: CATEGORY_COLORS[cat],
    borderColor: CATEGORY_COLORS[cat],
    borderWidth: 0,
    borderRadius: 4,
  }));
  return (
    <div style={{ height: 260 }}>
      <Bar data={{ labels: monthLabels, datasets }} options={barChartOptions} />
    </div>
  );
};