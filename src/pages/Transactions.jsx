import { useEffect, useState } from "react";
import { LayoutLoaderAdmin } from "../components/layout/Loaders";
import Table from "../components/specific/Table";
import Layout from "../components/layout/Layout";
import { TRANSACTIONS } from "../utils/sampleData";
import { useSelector } from "react-redux";
import AddTransactionDialog from "../components/specific/AddTransactionDialog";
import { motion } from "framer-motion";
import { MdAdd } from "react-icons/md";

const STORAGE_KEY = "fin_transactions";

// Read from localStorage, fall back to sampleData if nothing stored yet
const loadRows = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : TRANSACTIONS;
  } catch {
    return TRANSACTIONS;
  }
};

// Write to localStorage
const saveRows = (rows) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
};

const Transactions = () => {
  const [isLoading, setIsLoading]   = useState(true);
  const [rows, setRows]             = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const isAdmin = useSelector((state) => state.adminCheck.isAdmin);

  // On mount: load from localStorage (or sampleData as seed)
  useEffect(() => {
    setTimeout(() => {
      setRows(loadRows());
      setIsLoading(false);
    }, 1000);
  }, []);

  // Every time rows changes, persist to localStorage
  useEffect(() => {
    if (!isLoading) saveRows(rows);
  }, [rows, isLoading]);

  // Called when admin edits a cell inline in the DataGrid
  const handleRowUpdate = (updatedRow) => {
    setRows((prev) =>
      prev.map((r) => (r.id === updatedRow.id ? updatedRow : r))
    );
    return updatedRow; // required by DataGrid's processRowUpdate contract
  };

  // Called when AddTransactionDialog submits
  const handleAdd = (newTransaction) => {
    setRows((prev) => [newTransaction, ...prev]);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 200,
      headerClassName: "table-header",
    },
    {
      field: "date",
      headerName: "Date",
      width: 200,
      headerClassName: "table-header",
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 150,
      headerClassName: "table-header",
      editable: isAdmin,
      renderCell: (params) => (
        <span style={{ color: "#e8eaf0", fontFamily: "'Syne',sans-serif", fontWeight: 600 }}>
          {params.row.amount}
        </span>
      ),
    },
    {
      field: "category",
      headerName: "Category",
      width: 200,
      headerClassName: "table-header",
      editable: isAdmin,
      renderCell: (params) => (
        <span style={{ color: "#e8eaf0", fontFamily: "'Syne',sans-serif", fontWeight: 600 }}>
          {params.row.category}
        </span>
      ),
    },
    {
      field: "type",
      headerName: "Type",
      width: 200,
      headerClassName: "table-header",
      editable: isAdmin,
      renderCell: (params) => (
        <span style={{
          color: params.row.type === "Income" ? "#63dcbe" : "#e05c7a",
          fontFamily: "'DM Mono',monospace",
          fontSize: 13,
        }}>
          {params.row.type}
        </span>
      ),
    },
  ];

  return (
    <Layout>
      {isLoading ? (
        <LayoutLoaderAdmin />
      ) : (
        <>
          {isAdmin && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ marginBottom: 16 }}
            >
              <button
                onClick={() => setDialogOpen(true)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "9px 18px",
                  borderRadius: 10,
                  border: "none",
                  background: "linear-gradient(135deg, #63dcbe, #3bb8f5)",
                  color: "#0d0f14",
                  cursor: "pointer",
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: 13,
                  transition: "opacity 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                <MdAdd size={18} />
                Add Transaction
              </button>
            </motion.div>
          )}

          <Table
            heading="All Transactions"
            columns={columns}
            rows={rows}
            processRowUpdate={handleRowUpdate}   // passes edit handler into DataGrid
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