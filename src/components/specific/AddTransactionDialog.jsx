import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  FormControl,
  IconButton,
} from "@mui/material";
import { IoClose } from "react-icons/io5";
import { v4 as uuidv4 } from "uuid";
import { SelectSx } from "../../utils/styles";
import { TransactionDialogLableStyle } from "../../utils/styles";


const CATEGORIES = [
  "Food",
  "Health",
  "Entertainment",
  "Shopping",
  "Utilities",
  "Transport",
  "Salary",
  "Freelance",
  "Investment",
  "Education",
];

const TYPES = ["Income", "Expense"];

const inputStyle = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: 8,
  border: "1px solid var(--border)",
  background: "var(--bg)",
  color: "var(--text)",
  fontSize: 14,
  fontFamily: "'Roboto Mono', monospace",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.15s",
};

const EMPTY_FORM = { date: "", amount: "", category: "", type: "" };

const AddTransactionDialog = ({ open, onClose, onAdd }) => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.date)     e.date     = "Date is required";
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0)
      e.amount = "Enter a valid amount";
    if (!form.category) e.category = "Category is required";
    if (!form.type)     e.type     = "Type is required";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }

    onAdd({
      id:       uuidv4().split("-")[0],
      date:     form.date,
      amount:   Number(form.amount),
      category: form.category,
      type:     form.type,
    });

    setForm(EMPTY_FORM);
    setErrors({});
    onClose();
  };

  const handleClose = () => {
    setForm(EMPTY_FORM);
    setErrors({});
    onClose();
  };

  const set = (key, val) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        style: {
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 16,
          padding: 0,
          width: "100%",
          maxWidth: 460,
          boxShadow: "var(--shadow-modal)",
        },
      }}
    >
      {/* ── Header ── */}
      <DialogTitle
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 24px 0",
        }}
      >
        <div>
          <p style={{
            margin: 0,
            fontSize: 19,
            fontWeight: 700,
            color: "var(--text)",
            fontFamily: "'Roboto', sans-serif",
          }}>
            Add Transaction
          </p>
          <p style={{
            margin: "4px 0 0",
            fontSize: 12,
            color: "var(--text-muted)",
            fontFamily: "'Roboto Mono', monospace",
          }}>
            ID will be generated automatically
          </p>
        </div>
        <IconButton
          onClick={handleClose}
          size="small"
          style={{ color: "var(--text-muted)" }}
        >
          <IoClose size={20} />
        </IconButton>
      </DialogTitle>

      {/* ── Body ── */}
      <DialogContent style={{ padding: "20px 24px 24px", display: "flex", flexDirection: "column", gap: 18 }}>

        {/* Date */}
        <div>
          <label style={TransactionDialogLableStyle}>Date</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => set("date", e.target.value)}
            style={{
              ...inputStyle,
              borderColor: errors.date ? "var(--accent-rose)" : "var(--border)",
              colorScheme: "dark",
            }}
            onFocus={(e)  => (e.target.style.borderColor = errors.date ? "var(--accent-rose)" : "var(--accent)")}
            onBlur={(e)   => (e.target.style.borderColor = errors.date ? "var(--accent-rose)" : "var(--border)")}
          />
          {errors.date && <p style={{ color: "var(--accent-rose)", fontSize: 12, marginTop: 4, fontFamily: "'Roboto Mono',monospace" }}>{errors.date}</p>}
        </div>

        {/* Amount */}
        <div>
          <label style={TransactionDialogLableStyle}>Amount (₹)</label>
          <input
            type="number"
            min="1"
            placeholder="e.g. 2500"
            value={form.amount}
            onChange={(e) => set("amount", e.target.value)}
            style={{
              ...inputStyle,
              borderColor: errors.amount ? "var(--accent-rose)" : "var(--border)",
            }}
            onFocus={(e)  => (e.target.style.borderColor = errors.amount ? "var(--accent-rose)" : "var(--accent)")}
            onBlur={(e)   => (e.target.style.borderColor = errors.amount ? "var(--accent-rose)" : "var(--border)")}
          />
          {errors.amount && <p style={{ color: "var(--accent-rose)", fontSize: 12, marginTop: 4, fontFamily: "'Roboto Mono',monospace" }}>{errors.amount}</p>}
        </div>

        {/* Category + Type side by side */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>

          {/* Category */}
          <div>
            <label style={TransactionDialogLableStyle}>Category</label>
            <FormControl fullWidth size="small" error={!!errors.category}>
              <Select
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                displayEmpty
                sx={SelectSx}
                MenuProps={{
                  PaperProps: {
                    style: {
                      background: "var(--surface2)",
                      border: "1px solid var(--border)",
                      borderRadius: 10,
                      boxShadow: "var(--shadow-modal)",
                    },
                  },
                }}
              >
                <MenuItem value="" disabled sx={{ color: "var(--text-muted)", fontFamily: "'Roboto Mono',monospace", fontSize: 14 }}>
                  Select…
                </MenuItem>
                {CATEGORIES.map((c) => (
                  <MenuItem
                    key={c} value={c}
                    sx={{
                      color: "var(--text)", fontFamily: "'Roboto Mono',monospace", fontSize: 14,
                      borderRadius: "6px", margin: "2px 4px", padding: "8px 12px",
                      "&:hover": { background: "color-mix(in srgb, var(--accent) 8%, transparent)", color: "var(--accent)" },
                      "&.Mui-selected": { background: "color-mix(in srgb, var(--accent) 12%, transparent) !important", color: "var(--accent)" },
                    }}
                  >
                    {c}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {errors.category && <p style={{ color: "var(--accent-rose)", fontSize: 12, marginTop: 4, fontFamily: "'Roboto Mono',monospace" }}>{errors.category}</p>}
          </div>

          {/* Type */}
          <div>
            <label style={TransactionDialogLableStyle}>Type</label>
            <FormControl fullWidth size="small" error={!!errors.type}>
              <Select
                value={form.type}
                onChange={(e) => set("type", e.target.value)}
                displayEmpty
                sx={SelectSx}
                MenuProps={{
                  PaperProps: {
                    style: {
                      background: "var(--surface2)",
                      border: "1px solid var(--border)",
                      borderRadius: 10,
                      boxShadow: "var(--shadow-modal)",
                    },
                  },
                }}
              >
                <MenuItem value="" disabled sx={{ color: "var(--text-muted)", fontFamily: "'Roboto Mono',monospace", fontSize: 14 }}>
                  Select…
                </MenuItem>
                {TYPES.map((t) => (
                  <MenuItem
                    key={t} value={t}
                    sx={{
                      color: "var(--text)", fontFamily: "'Roboto Mono',monospace", fontSize: 14,
                      borderRadius: "6px", margin: "2px 4px", padding: "8px 12px",
                      "&:hover": { background: "color-mix(in srgb, var(--accent) 8%, transparent)", color: "var(--accent)" },
                      "&.Mui-selected": { background: "color-mix(in srgb, var(--accent) 12%, transparent) !important", color: "var(--accent)" },
                    }}
                  >
                    {t}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {errors.type && <p style={{ color: "var(--accent-rose)", fontSize: 12, marginTop: 4, fontFamily: "'Roboto Mono',monospace" }}>{errors.type}</p>}
          </div>

        </div>

        {/* ── Action buttons ── */}
        <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
          <button
            onClick={handleClose}
            style={{
              flex: 1, padding: "10px 0", borderRadius: 8,
              border: "1px solid var(--border)", background: "none",
              color: "var(--text-muted)", cursor: "pointer",
              fontFamily: "'Roboto', sans-serif", fontWeight: 700, fontSize: 14,
              transition: "border-color 0.15s, color 0.15s",
            }}
            onMouseEnter={(e) => { e.target.style.borderColor = "var(--text-muted)"; e.target.style.color = "var(--text)"; }}
            onMouseLeave={(e) => { e.target.style.borderColor = "var(--border)"; e.target.style.color = "var(--text-muted)"; }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            style={{
              flex: 2, padding: "10px 0", borderRadius: 8,
              border: "none",
              background: "linear-gradient(135deg, #63dcbe, #3bb8f5)",
              color: "#0d0f14", cursor: "pointer",
              fontFamily: "'Roboto', sans-serif", fontWeight: 700, fontSize: 14,
              transition: "opacity 0.15s",
            }}
            onMouseEnter={(e) => (e.target.style.opacity = "0.88")}
            onMouseLeave={(e) => (e.target.style.opacity = "1")}
          >
            Add Transaction
          </button>
        </div>

      </DialogContent>
    </Dialog>
  );
};

export default AddTransactionDialog;