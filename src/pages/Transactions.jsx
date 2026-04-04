import { MenuItem, Select } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { useSelector } from "react-redux";
import Layout from "../components/layout/Layout";
import { LayoutLoaderAdmin } from "../components/layout/Loaders";
import AddTransactionDialog from "../components/specific/AddTransactionDialog";
import Table from "../components/specific/Table";
import { transactionData } from "../utils/sampleData";

const STORAGE_KEY = "fin_transactions";

const loadRows = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : transactionData;
  } catch {
    return transactionData;
  }
};

const saveRows = (rows) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
};

const Transactions = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const isAdmin = useSelector((state) => state.adminCheck.isAdmin);

  useEffect(() => {
    const t = setTimeout(() => {
      setRows(loadRows());
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!isLoading) saveRows(rows);
  }, [rows, isLoading]);

  const handleRowUpdate = (updatedRow) => {
    setRows((prev) => prev.map((r) => (r.id === updatedRow.id ? updatedRow : r)));
    return updatedRow;
  };

  const handleAdd = (newTransaction) => {
    setRows((prev) => [newTransaction, ...prev]);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 200, headerClassName: "table-header" },
    { field: "date", headerName: "Date(YYYY-MM-DD)", width: 200, headerClassName: "table-header" },
    {
      field: "amount", headerName: "Amount", width: 150, headerClassName: "table-header",
      editable: isAdmin,
      renderCell: (params) => (
        <span className="text-light-text dark:text-dark-text font-['Roboto'] font-semibold">
          {params.row.amount}
        </span>
      ),
    },
    {
      field: "category", headerName: "Category", width: 220, headerClassName: "table-header",
      renderCell: (params) => {
        if (!isAdmin) {
          return (
            <span className="text-light-text dark:text-dark-text font-['Roboto'] font-semibold">
              {params.row.category}
            </span>
          );
        }
        return (
          <Select
            value={params.row.category}
            onChange={(e) => handleRowUpdate({ ...params.row, category: e.target.value })}
            variant="standard"
            disableUnderline
            sx={{
              width: "100%", maxWidth: "160px",
              fontFamily: "'Roboto Mono', monospace",
              fontSize: "13px",
              color: "var(--text)",
              "& .MuiSelect-select": {
                padding: "6px 10px !important",
                background: "var(--surface2)",
                border: "1px solid var(--border)",
                borderRadius: "6px",
              },
              "& .MuiSvgIcon-root": { color: "var(--text-muted)" }
            }}
          >
            {["Food & Dining", "Health", "Entertainment", "Shopping", "Utilities", "Transport"].map((opt) => (
              <MenuItem key={opt} value={opt}>{opt}</MenuItem>
            ))}
          </Select>
        );
      },
    },
    {
      field: "type", headerName: "Type", width: 200, headerClassName: "table-header",
      renderCell: (params) => {
        if (!isAdmin) {
          return (
            <span
              className="font-['Roboto_Mono'] text-[14px] font-semibold"
              style={{ color: params.row.type === "Income" ? "#63dcbe" : "#e05c7a" }}
            >
              {params.row.type}
            </span>
          );
        }
        return (
          <Select
            value={params.row.type}
            onChange={(e) => handleRowUpdate({ ...params.row, type: e.target.value })}
            variant="standard"
            disableUnderline
            sx={{
              width: "100%", maxWidth: "140px",
              fontFamily: "'Roboto Mono', monospace",
              fontSize: "13px",
              fontWeight: 700,
              color: params.row.type === "Income" ? "#63dcbe" : "#e05c7a",
              "& .MuiSelect-select": {
                padding: "6px 10px !important",
                background: "var(--surface2)",
                border: "1px solid var(--border)",
                borderRadius: "6px",
              },
              "& .MuiSvgIcon-root": { color: "var(--text-muted)" }
            }}
          >
            <MenuItem value="Income">Income</MenuItem>
            <MenuItem value="Expense">Expense</MenuItem>
          </Select>
        );
      },
    },
  ];

  return (
    <Layout>
      {isLoading ? (
        <LayoutLoaderAdmin />
      ) : (
        <>
          <Table
            heading="All Transactions"
            columns={columns}
            rows={rows}
            processRowUpdate={handleRowUpdate}
            action={
              isAdmin && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                  <button
                    onClick={() => setDialogOpen(true)}
                    className="
                      flex items-center gap-2 px-[16px] py-[8px] rounded-[10px]
                      border-none bg-gradient-to-r from-accent-green to-[#3bb8f5]
                      text-dark-bg font-['Roboto'] font-bold text-[14px]
                      cursor-pointer transition-opacity duration-150
                      hover:opacity-90
                    "
                  >
                    <MdAdd size={18} />
                    <span className="hidden sm:inline">Add Transaction</span>
                    <span className="inline sm:hidden">Add</span>
                  </button>
                </motion.div>
              )
            }
          />

          <AddTransactionDialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            onAdd={handleAdd}
          />
        </>
      )}
    </Layout>
  );
};

export default Transactions;