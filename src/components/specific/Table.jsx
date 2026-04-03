import { DataGrid } from "@mui/x-data-grid";
import { GlobalStyles } from "@mui/material";

const menuStyles = (
  <GlobalStyles styles={{
    ".MuiDataGrid-menuList": {
      background: "#1a1e28 !important",
      padding: "4px !important",
    },
    ".MuiDataGrid-menuList.MuiList-root": {
      background: "#1a1e28 !important",
    },
    "div[role='tooltip'] .MuiPaper-root, div[role='presentation'] .MuiPaper-root": {
      background: "#1a1e28",
      border: "1px solid #1e2330",
      borderRadius: "10px",
      boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
    },
    ".MuiDataGrid-menuList .MuiMenuItem-root": {
      color: "#e8eaf0 !important",
      fontFamily: "'Syne', sans-serif !important",
      fontSize: "13px !important",
      borderRadius: "6px !important",
      margin: "2px 4px !important",
      padding: "8px 12px !important",
    },
    ".MuiDataGrid-menuList .MuiMenuItem-root:hover": {
      background: "rgba(99, 220, 190, 0.08) !important",
      color: "#63dcbe !important",
    },
    ".MuiDataGrid-menuList .MuiMenuItem-root .MuiListItemIcon-root": {
      color: "#5a607a !important",
      minWidth: "32px !important",
    },
    ".MuiDataGrid-menuList .MuiMenuItem-root:hover .MuiListItemIcon-root": {
      color: "#63dcbe !important",
    },
    ".MuiDataGrid-menuList .MuiDivider-root": {
      borderColor: "#1e2330 !important",
      margin: "4px 0 !important",
    },
    ".MuiDataGrid-paper": {
      background: "#1a1e28 !important",
      border: "1px solid #1e2330 !important",
      borderRadius: "12px !important",
      boxShadow: "0 8px 32px rgba(0,0,0,0.5) !important",
      color: "#e8eaf0 !important",
    },
    ".MuiDataGrid-panelContent": { background: "#1a1e28 !important" },
    ".MuiDataGrid-panelHeader": {
      background: "#1a1e28 !important",
      borderBottom: "1px solid #1e2330 !important",
      paddingBottom: "8px !important",
    },
    ".MuiDataGrid-panelFooter": {
      background: "#1a1e28 !important",
      borderTop: "1px solid #1e2330 !important",
    },
    ".MuiDataGrid-paper .MuiFormLabel-root, .MuiDataGrid-paper .MuiInputLabel-root": {
      color: "#8890a8 !important",
      fontFamily: "'DM Mono', monospace !important",
      fontSize: "12px !important",
    },
    ".MuiDataGrid-paper .MuiTypography-root": {
      color: "#e8eaf0 !important",
      fontFamily: "'Syne', sans-serif !important",
    },
    ".MuiDataGrid-paper .MuiInputBase-root": {
      color: "#e8eaf0 !important",
      fontFamily: "'DM Mono', monospace !important",
      fontSize: "13px !important",
    },
    ".MuiDataGrid-paper .MuiInput-underline:before": { borderBottomColor: "#1e2330 !important" },
    ".MuiDataGrid-paper .MuiInput-underline:hover:before": { borderBottomColor: "#63dcbe !important" },
    ".MuiDataGrid-paper .MuiInput-underline:after": { borderBottomColor: "#63dcbe !important" },
    ".MuiDataGrid-paper .MuiSvgIcon-root": { color: "#5a607a !important" },
    ".MuiDataGrid-paper .MuiNativeSelect-select, .MuiDataGrid-paper .MuiSelect-select": {
      color: "#e8eaf0 !important",
      fontFamily: "'DM Mono', monospace !important",
      fontSize: "13px !important",
    },
    ".MuiDataGrid-paper .MuiCheckbox-root": { color: "#5a607a !important" },
    ".MuiDataGrid-paper .MuiCheckbox-root.Mui-checked": { color: "#63dcbe !important" },
    ".MuiDataGrid-paper .MuiSwitch-switchBase.Mui-checked": { color: "#63dcbe !important" },
    ".MuiDataGrid-paper .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { backgroundColor: "#63dcbe !important" },
    ".MuiDataGrid-paper .MuiButton-root": {
      color: "#63dcbe !important",
      fontFamily: "'Syne', sans-serif !important",
      fontSize: "12px !important",
    },
    ".MuiDataGrid-paper .MuiButton-root:hover": { background: "rgba(99, 220, 190, 0.08) !important" },
  }} />
);

// processRowUpdate is the only new prop — everything else unchanged
const Table = ({ rows, columns, heading, rowHeight = 52, processRowUpdate }) => {
  return (
    <div>
      {menuStyles}

      <div style={{ marginBottom: 20 }}>
        <h2 style={{
          color: "#e8eaf0",
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: 22,
          margin: 0,
        }}>
          {heading}
        </h2>
        <p style={{
          color: "#5a607a",
          fontFamily: "'DM Mono', monospace",
          fontSize: 12,
          marginTop: 4,
        }}>
          {rows.length} record{rows.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div style={{
        background: "#13161e",
        border: "1px solid #1e2330",
        borderRadius: 16,
        overflow: "hidden",
        height: 560,
      }}>
        <DataGrid
          rows={rows}
          columns={columns}
          rowHeight={rowHeight}
          // fires when admin finishes editing a cell — bubbles up to Transactions.jsx
          processRowUpdate={processRowUpdate}
          // silently swallow any processRowUpdate errors so DataGrid doesn't crash
          onProcessRowUpdateError={(err) => console.error("Row update error:", err)}
          sx={{
            border: "none",
            color: "#e8eaf0",
            fontFamily: "'Syne', sans-serif",
            background: "transparent",
            "& .MuiDataGrid-columnHeaders": {
              background: "#1a1e28",
              borderBottom: "1px solid #1e2330",
            },
            "& .MuiDataGrid-columnHeader": { background: "#1a1e28" },
            "& .MuiDataGrid-columnHeaderTitle": {
              color: "#8890a8",
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            },
            "& .MuiDataGrid-columnSeparator": { display: "none" },
            "& .MuiDataGrid-row": {
              borderBottom: "1px solid rgba(255,255,255,0.04)",
              "&:hover": { background: "rgba(99,220,190,0.04)" },
              "&.Mui-selected": {
                background: "rgba(99,220,190,0.08)",
                "&:hover": { background: "rgba(99,220,190,0.1)" },
              },
            },
            "& .MuiDataGrid-cell": {
              color: "#e8eaf0",
              borderBottom: "none",
              fontFamily: "'Syne', sans-serif",
              fontSize: 13,
            },
            "& .MuiDataGrid-cell:focus":        { outline: "none" },
            "& .MuiDataGrid-cell:focus-within": { outline: "none" },
            "& .MuiDataGrid-footerContainer": {
              background: "#1a1e28",
              borderTop: "1px solid #1e2330",
            },
            "& .MuiTablePagination-root": {
              color: "#5a607a",
              fontFamily: "'DM Mono', monospace",
              fontSize: 12,
            },
            "& .MuiTablePagination-actions button":       { color: "#8890a8" },
            "& .MuiTablePagination-actions button:hover": { color: "#63dcbe" },
            "& .MuiCheckbox-root":          { color: "#5a607a" },
            "& .MuiDataGrid-scrollbar":     { scrollbarColor: "#1e2330 transparent" },
            "& .MuiDataGrid-filler":        { background: "#1a1e28" },
            "& .MuiDataGrid-filler > div":  { borderTop: "none" },
            "& .table-header": {
              background: "#1a1e28",
              color: "#8890a8",
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
            },
          }}
        />
      </div>
    </div>
  );
};

export default Table;