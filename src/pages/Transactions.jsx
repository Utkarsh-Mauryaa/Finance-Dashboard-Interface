import { MenuItem, Select } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { MdAdd, MdDeleteOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import AddTransactionDialog from "../components/DialogBoxes/AddTransactionDialog";
import { DeleteConfirmDialog } from "../components/DialogBoxes/DeleteConfirmDialog";
import Layout from "../components/layout/Layout";
import { LayoutLoaderAdmin } from "../components/layout/Loaders";
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
  const [isLoading, setIsLoading]   = useState(true);
  const [rows, setRows]             = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteRow, setDeleteRow]   = useState(null);

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

  const handleDeleteConfirm = () => {
    setRows((prev) => prev.filter((r) => r.id !== deleteRow.id));
    setDeleteRow(null);
  };

  const columns = [
    { field: "id",   headerName: "ID",               width: 160, headerClassName: "table-header" },
    { field: "date", headerName: "Date (YYYY-MM-DD)", width: 180, headerClassName: "table-header" },
    {
      field: "amount", headerName: "Amount", width: 140, headerClassName: "table-header",
      editable: isAdmin,
      renderCell: (params) => (
        <span className="text-light-text dark:text-dark-text font-['Roboto'] font-semibold">
          ₹{params.row.amount.toLocaleString("en-IN")}
        </span>
      ),
    },
    {
      field: "category", headerName: "Category", width: 200, headerClassName: "table-header",
      renderCell: (params) => {
        if (!isAdmin) return (
          <span className="text-light-text dark:text-dark-text font-['Roboto'] font-semibold">
            {params.row.category}
          </span>
        );
        return (
          <Select
            value={params.row.category}
            onChange={(e) => handleRowUpdate({ ...params.row, category: e.target.value })}
            variant="standard" disableUnderline
            sx={{
              width: "100%", maxWidth: "160px",
              fontFamily: "'Roboto Mono', monospace", fontSize: "13px", color: "var(--text)",
              "& .MuiSelect-select": { padding: "6px 10px !important", background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: "6px" },
              "& .MuiSvgIcon-root": { color: "var(--text-muted)" },
            }}
          >
            {["Food & Dining", "Health", "Entertainment", "Shopping", "Utilities", "Transport", "Salary", "Freelance", "Investment", "Education"].map((opt) => (
              <MenuItem key={opt} value={opt}>{opt}</MenuItem>
            ))}
          </Select>
        );
      },
    },
    {
      field: "type", headerName: "Type", width: 160, headerClassName: "table-header",
      renderCell: (params) => {
        if (!isAdmin) return (
          <span
            className="font-['Roboto_Mono'] text-[14px] font-semibold"
            style={{ color: params.row.type === "Income" ? "#63dcbe" : "#e05c7a" }}
          >
            {params.row.type}
          </span>
        );
        return (
          <Select
            value={params.row.type}
            onChange={(e) => handleRowUpdate({ ...params.row, type: e.target.value })}
            variant="standard" disableUnderline
            sx={{
              width: "100%", maxWidth: "140px",
              fontFamily: "'Roboto Mono', monospace", fontSize: "13px", fontWeight: 700,
              color: params.row.type === "Income" ? "#63dcbe" : "#e05c7a",
              "& .MuiSelect-select": { padding: "6px 10px !important", background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: "6px" },
              "& .MuiSvgIcon-root": { color: "var(--text-muted)" },
            }}
          >
            <MenuItem value="Income">Income</MenuItem>
            <MenuItem value="Expense">Expense</MenuItem>
          </Select>
        );
      },
    },

    ...(isAdmin ? [{
      field: "__delete",
      headerName: "",
      width: 60,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      headerClassName: "table-header",
      renderCell: (params) => (
        <div className="flex items-center justify-center w-full h-full">
          <button
            onClick={() => setDeleteRow(params.row)}
            title="Delete transaction"
            style={{
              background: "none", border: "none", cursor: "pointer",
              padding: "6px", borderRadius: "8px",
              color: "var(--text-muted)",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "color 0.15s, background 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#e05c7a";
              e.currentTarget.style.background = "rgba(224,92,122,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--text-muted)";
              e.currentTarget.style.background = "none";
            }}
          >
            <MdDeleteOutline size={18} />
          </button>
        </div>
      ),
    }] : []),
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
                      cursor-pointer transition-opacity duration-150 hover:opacity-90
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

          <DeleteConfirmDialog
            open={!!deleteRow}
            row={deleteRow}
            onConfirm={handleDeleteConfirm}
            onCancel={() => setDeleteRow(null)}
          />
        </>
      )}
    </Layout>
  );
};

export default Transactions;