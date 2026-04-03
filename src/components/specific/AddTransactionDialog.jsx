import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  IconButton,
} from "@mui/material";
import { IoClose } from "react-icons/io5";
import { v4 as uuidv4 } from "uuid";


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
  border: "1px solid #1e2330",
  background: "#0d0f14",
  color: "#e8eaf0",
  fontSize: 13,
  fontFamily: "'DM Mono', monospace",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.15s",
};

const labelStyle = {
  display: "block",
  fontSize: 11,
  fontWeight: 700,
  color: "#5a607a",
  textTransform: "uppercase",
  letterSpacing: "0.07em",
  marginBottom: 6,
  fontFamily: "'DM Mono', monospace",
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

  // shared MUI Select sx
  const selectSx = {
    color: "#e8eaf0",
    fontFamily: "'DM Mono', monospace",
    fontSize: 13,
    background: "#0d0f14",
    borderRadius: "8px",
    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#1e2330" },
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#63dcbe" },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#63dcbe" },
    "& .MuiSvgIcon-root": { color: "#5a607a" },
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        style: {
          background: "#13161e",
          border: "1px solid #1e2330",
          borderRadius: 16,
          padding: 0,
          width: "100%",
          maxWidth: 460,
          boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
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
            fontSize: 18,
            fontWeight: 800,
            color: "#e8eaf0",
            fontFamily: "'Syne', sans-serif",
          }}>
            Add Transaction
          </p>
          <p style={{
            margin: "4px 0 0",
            fontSize: 11,
            color: "#5a607a",
            fontFamily: "'DM Mono', monospace",
          }}>
            ID will be generated automatically
          </p>
        </div>
        <IconButton
          onClick={handleClose}
          size="small"
          style={{ color: "#5a607a" }}
        >
          <IoClose size={20} />
        </IconButton>
      </DialogTitle>

      {/* ── Body ── */}
      <DialogContent style={{ padding: "20px 24px 24px", display: "flex", flexDirection: "column", gap: 18 }}>

        {/* Date */}
        <div>
          <label style={labelStyle}>Date</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => set("date", e.target.value)}
            style={{
              ...inputStyle,
              borderColor: errors.date ? "#e05c7a" : "#1e2330",
              colorScheme: "dark",
            }}
            onFocus={(e)  => (e.target.style.borderColor = errors.date ? "#e05c7a" : "#63dcbe")}
            onBlur={(e)   => (e.target.style.borderColor = errors.date ? "#e05c7a" : "#1e2330")}
          />
          {errors.date && <p style={{ color: "#e05c7a", fontSize: 11, marginTop: 4, fontFamily: "'DM Mono',monospace" }}>{errors.date}</p>}
        </div>

        {/* Amount */}
        <div>
          <label style={labelStyle}>Amount (₹)</label>
          <input
            type="number"
            min="1"
            placeholder="e.g. 2500"
            value={form.amount}
            onChange={(e) => set("amount", e.target.value)}
            style={{
              ...inputStyle,
              borderColor: errors.amount ? "#e05c7a" : "#1e2330",
            }}
            onFocus={(e)  => (e.target.style.borderColor = errors.amount ? "#e05c7a" : "#63dcbe")}
            onBlur={(e)   => (e.target.style.borderColor = errors.amount ? "#e05c7a" : "#1e2330")}
          />
          {errors.amount && <p style={{ color: "#e05c7a", fontSize: 11, marginTop: 4, fontFamily: "'DM Mono',monospace" }}>{errors.amount}</p>}
        </div>

        {/* Category + Type side by side */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>

          {/* Category */}
          <div>
            <label style={labelStyle}>Category</label>
            <FormControl fullWidth size="small" error={!!errors.category}>
              <Select
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                displayEmpty
                sx={selectSx}
                MenuProps={{
                  PaperProps: {
                    style: {
                      background: "#1a1e28",
                      border: "1px solid #1e2330",
                      borderRadius: 10,
                      boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                    },
                  },
                }}
              >
                <MenuItem value="" disabled sx={{ color: "#5a607a", fontFamily: "'DM Mono',monospace", fontSize: 13 }}>
                  Select…
                </MenuItem>
                {CATEGORIES.map((c) => (
                  <MenuItem
                    key={c} value={c}
                    sx={{
                      color: "#e8eaf0", fontFamily: "'DM Mono',monospace", fontSize: 13,
                      borderRadius: "6px", margin: "2px 4px", padding: "8px 12px",
                      "&:hover": { background: "rgba(99,220,190,0.08)", color: "#63dcbe" },
                      "&.Mui-selected": { background: "rgba(99,220,190,0.12) !important", color: "#63dcbe" },
                    }}
                  >
                    {c}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {errors.category && <p style={{ color: "#e05c7a", fontSize: 11, marginTop: 4, fontFamily: "'DM Mono',monospace" }}>{errors.category}</p>}
          </div>

          {/* Type */}
          <div>
            <label style={labelStyle}>Type</label>
            <FormControl fullWidth size="small" error={!!errors.type}>
              <Select
                value={form.type}
                onChange={(e) => set("type", e.target.value)}
                displayEmpty
                sx={selectSx}
                MenuProps={{
                  PaperProps: {
                    style: {
                      background: "#1a1e28",
                      border: "1px solid #1e2330",
                      borderRadius: 10,
                      boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                    },
                  },
                }}
              >
                <MenuItem value="" disabled sx={{ color: "#5a607a", fontFamily: "'DM Mono',monospace", fontSize: 13 }}>
                  Select…
                </MenuItem>
                {TYPES.map((t) => (
                  <MenuItem
                    key={t} value={t}
                    sx={{
                      color: "#e8eaf0", fontFamily: "'DM Mono',monospace", fontSize: 13,
                      borderRadius: "6px", margin: "2px 4px", padding: "8px 12px",
                      "&:hover": { background: "rgba(99,220,190,0.08)", color: "#63dcbe" },
                      "&.Mui-selected": { background: "rgba(99,220,190,0.12) !important", color: "#63dcbe" },
                    }}
                  >
                    {t}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {errors.type && <p style={{ color: "#e05c7a", fontSize: 11, marginTop: 4, fontFamily: "'DM Mono',monospace" }}>{errors.type}</p>}
          </div>

        </div>

        {/* ── Action buttons ── */}
        <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
          <button
            onClick={handleClose}
            style={{
              flex: 1, padding: "10px 0", borderRadius: 8,
              border: "1px solid #1e2330", background: "none",
              color: "#5a607a", cursor: "pointer",
              fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13,
              transition: "border-color 0.15s, color 0.15s",
            }}
            onMouseEnter={(e) => { e.target.style.borderColor = "#5a607a"; e.target.style.color = "#e8eaf0"; }}
            onMouseLeave={(e) => { e.target.style.borderColor = "#1e2330"; e.target.style.color = "#5a607a"; }}
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
              fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 13,
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