import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { IoClose } from "react-icons/io5";

export const DeleteConfirmDialog = ({ open, row, onConfirm, onCancel }) => (
  <Dialog
    open={open}
    onClose={onCancel}
    PaperProps={{
      style: {
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 16,
        width: "100%",
        maxWidth: 400,
        boxShadow: "var(--shadow-modal)",
      },
    }}
  >
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
          margin: 0, fontSize: 17, fontWeight: 700,
          color: "var(--text)", fontFamily: "'Roboto', sans-serif",
        }}>
          Delete Transaction
        </p>
        <p style={{
          margin: "4px 0 0", fontSize: 12,
          color: "var(--text-muted)", fontFamily: "'Roboto Mono', monospace",
        }}>
          This action cannot be undone
        </p>
      </div>
      <IconButton onClick={onCancel} size="small" style={{ color: "var(--text-muted)" }}>
        <IoClose size={20} />
      </IconButton>
    </DialogTitle>

    <DialogContent style={{ padding: "16px 24px 24px", display: "flex", flexDirection: "column", gap: 20 }}>

      
      {row && (
        <div style={{
          background: "var(--surface2)",
          border: "1px solid var(--border)",
          borderRadius: 10,
          padding: "12px 16px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}>
          {[
            { label: "ID",       value: row.id },
            { label: "Date",     value: row.date },
            { label: "Amount",   value: `₹${row.amount.toLocaleString("en-IN")}` },
            { label: "Category", value: row.category },
            { label: "Type",     value: row.type },
          ].map(({ label, value }) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{
                fontSize: 11, color: "var(--text-muted)",
                fontFamily: "'Roboto Mono', monospace",
                textTransform: "uppercase", letterSpacing: "0.06em",
              }}>
                {label}
              </span>
              <span style={{
                fontSize: 13, fontFamily: "'Roboto Mono', monospace",
                fontWeight: label === "Amount" ? 700 : 400,
                color: label === "Type"
                  ? row.type === "Income" ? "#63dcbe" : "#e05c7a"
                  : "var(--text)",
              }}>
                {value}
              </span>
            </div>
          ))}
        </div>
      )}

      
      <div style={{ display: "flex", gap: 10 }}>
        <button
          onClick={onCancel}
          style={{
            flex: 1, padding: "10px 0", borderRadius: 8,
            border: "1px solid var(--border)", background: "none",
            color: "var(--text-muted)", cursor: "pointer",
            fontFamily: "'Roboto', sans-serif", fontWeight: 700, fontSize: 14,
            transition: "border-color 0.15s, color 0.15s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--text-muted)"; e.currentTarget.style.color = "var(--text)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)"; }}
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          style={{
            flex: 2, padding: "10px 0", borderRadius: 8,
            border: "none",
            background: "linear-gradient(135deg, #e05c7a, #f93155)",
            color: "#fff", cursor: "pointer",
            fontFamily: "'Roboto', sans-serif", fontWeight: 700, fontSize: 14,
            transition: "opacity 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Delete Transaction
        </button>
      </div>

    </DialogContent>
  </Dialog>
);