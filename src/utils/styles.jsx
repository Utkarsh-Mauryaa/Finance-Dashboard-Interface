import { GlobalStyles } from "@mui/material";

export const PortalStyles = () => {
    return <GlobalStyles styles={{
        ".MuiDataGrid-menuList": { background: "var(--surface2) !important", padding: "4px !important" },
        ".MuiDataGrid-menuList.MuiList-root": { background: "var(--surface2) !important" },
        "div[role='tooltip'] .MuiPaper-root, div[role='presentation'] .MuiPaper-root": {
            background: "var(--surface2)",
            border: "1px solid var(--border)",
            borderRadius: "10px",
            boxShadow: "var(--shadow-modal)",
        },
        ".MuiDataGrid-menuList .MuiMenuItem-root": {
            color: "var(--text) !important",
            fontFamily: "'Roboto', sans-serif !important",
            fontSize: "14px !important",
            borderRadius: "6px !important",
            margin: "2px 4px !important",
            padding: "8px 12px !important",
        },
        ".MuiDataGrid-menuList .MuiMenuItem-root:hover": {
            background: "color-mix(in srgb, var(--accent) 8%, transparent) !important",
            color: "var(--accent) !important",
        },
        ".MuiDataGrid-menuList .MuiMenuItem-root .MuiListItemIcon-root": { color: "var(--text-muted) !important", minWidth: "32px !important" },
        ".MuiDataGrid-menuList .MuiMenuItem-root:hover .MuiListItemIcon-root": { color: "var(--accent) !important" },
        ".MuiDataGrid-menuList .MuiDivider-root": { borderColor: "var(--border) !important", margin: "4px 0 !important" },
        ".MuiDataGrid-paper": {
            background: "var(--surface2) !important",
            border: "1px solid var(--border) !important",
            borderRadius: "12px !important",
            boxShadow: "var(--shadow-modal) !important",
            color: "var(--text) !important",
        },
        ".MuiDataGrid-panelContent": { background: "var(--surface2) !important" },
        ".MuiDataGrid-panelHeader": { background: "var(--surface2) !important", borderBottom: "1px solid var(--border) !important", paddingBottom: "8px !important" },
        ".MuiDataGrid-panelFooter": { background: "var(--surface2) !important", borderTop: "1px solid var(--border) !important" },
        ".MuiDataGrid-paper .MuiFormLabel-root, .MuiDataGrid-paper .MuiInputLabel-root": { color: "var(--text-dim) !important", fontFamily: "'Roboto Mono', monospace !important", fontSize: "13px !important" },
        ".MuiDataGrid-paper .MuiTypography-root": { color: "var(--text) !important", fontFamily: "'Roboto', sans-serif !important" },
        ".MuiDataGrid-paper .MuiInputBase-root": { color: "var(--text) !important", fontFamily: "'Roboto Mono', monospace !important", fontSize: "14px !important" },
        ".MuiDataGrid-paper .MuiInput-underline:before": { borderBottomColor: "var(--border) !important" },
        ".MuiDataGrid-paper .MuiInput-underline:hover:before": { borderBottomColor: "var(--accent) !important" },
        ".MuiDataGrid-paper .MuiInput-underline:after": { borderBottomColor: "var(--accent) !important" },
        ".MuiDataGrid-paper .MuiSvgIcon-root": { color: "var(--text-muted) !important" },
        ".MuiDataGrid-paper .MuiNativeSelect-select, .MuiDataGrid-paper .MuiSelect-select": { color: "var(--text) !important", fontFamily: "'Roboto Mono', monospace !important", fontSize: "14px !important" },
        ".MuiDataGrid-paper .MuiCheckbox-root": { color: "var(--text-muted) !important" },
        ".MuiDataGrid-paper .MuiCheckbox-root.Mui-checked": { color: "var(--accent) !important" },
        ".MuiDataGrid-paper .MuiSwitch-switchBase.Mui-checked": { color: "var(--accent) !important" },
        ".MuiDataGrid-paper .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { backgroundColor: "var(--accent) !important" },
        ".MuiDataGrid-paper .MuiButton-root": { color: "var(--accent) !important", fontFamily: "'Roboto', sans-serif !important", fontSize: "13px !important" },
        ".MuiDataGrid-paper .MuiButton-root:hover": { background: "color-mix(in srgb, var(--accent) 8%, transparent) !important" },
    }} />
};


export const DataGridStyles = () => {
    return {
        border: "none",
        color: "var(--text)",
        fontFamily: "'Roboto', sans-serif",
        background: "transparent",
        "& .MuiDataGrid-columnHeaders": { background: "var(--surface2)", borderBottom: "1px solid var(--border)" },
        "& .MuiDataGrid-columnHeader": { background: "var(--surface2)" },
        "& .MuiDataGrid-columnHeaderTitle": { color: "var(--text-dim)", fontFamily: "'Roboto', sans-serif", fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.06em" },
        "& .MuiDataGrid-columnSeparator": { display: "none" },
        "& .MuiDataGrid-row": {
            borderBottom: "1px solid var(--border-light)",
            "&:hover": { background: "color-mix(in srgb, var(--accent) 4%, transparent)" },
            "&.Mui-selected": { background: "color-mix(in srgb, var(--accent) 8%, transparent)", "&:hover": { background: "color-mix(in srgb, var(--accent) 10%, transparent)" } },
        },
        "& .MuiDataGrid-cell": { color: "var(--text)", borderBottom: "none", fontFamily: "'Roboto', sans-serif", fontSize: 14 },
        "& .MuiDataGrid-cell:focus": { outline: "none" },
        "& .MuiDataGrid-cell:focus-within": { outline: "none" },
        "& .MuiInputBase-input": { color: "var(--text) !important", fontFamily: "'Roboto Mono', monospace" },
        "& .MuiSelect-select": { color: "var(--text) !important" },
        "& .MuiDataGrid-footerContainer": { background: "var(--surface2)", borderTop: "1px solid var(--border)" },
        "& .MuiTablePagination-root": { color: "var(--text-dim)", fontFamily: "'Roboto Mono', monospace", fontSize: 13 },
        "& .MuiTablePagination-displayedRows": { color: "var(--text-dim)" },
        "& .MuiTablePagination-selectLabel": { color: "var(--text-dim)" },
        "& .MuiTablePagination-actions button": { color: "var(--text-dim)" },
        "& .MuiTablePagination-actions button:hover": { color: "var(--accent)" },
        "& .MuiCheckbox-root": { color: "var(--text-muted)" },
        "& .MuiCheckbox-root.Mui-checked": { color: "var(--accent)" },
        "& .MuiDataGrid-scrollbar": { scrollbarColor: "var(--border) transparent" },
        "& .MuiDataGrid-filler": { background: "var(--surface2)" },
        "& .MuiDataGrid-filler > div": { borderTop: "none" },
        "& .table-header": { background: "var(--surface2)", color: "var(--text-dim)", fontFamily: "'Roboto', sans-serif", fontWeight: 700 },
    }
}

export const NavbarHeaderClass = "sticky top-0 z-50 w-full h-[52px] sm:h-[63px] flex items-center justify-between px-2 sm:px-5 bg-light-surface dark:bg-dark-nav border-b border-light-border dark:border-dark-border backdrop-blur-sm transition-colors duration-300";

export const MobileButtonClass = "md:hidden flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl border border-light-border dark:border-dark-border text-light-muted dark:text-dark-muted hover:bg-light-hover dark:hover:bg-dark-hover hover:text-light-text dark:hover:text-dark-text transition-colors duration-150 cursor-pointer";

export const RoleButtonClass = "px-2 sm:px-3 md:px-4 py-[3px] sm:py-[5px] rounded-[6px] sm:rounded-[7px] text-[10px] sm:text-[11px] md:text-[12px] font-bold uppercase tracking-[0.07em] cursor-pointer transition-all duration-150";

export const ToggleThemeButtonClass = "flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl border border-light-border dark:border-dark-border bg-light-pill dark:bg-dark-pill text-light-muted dark:text-dark-muted hover:bg-light-hover dark:hover:bg-dark-hover hover:text-accent-amber dark:hover:text-accent-cyan transition-all duration-200 cursor-pointer";

export const SelectSx = {
    color: "var(--text)",
    fontFamily: "'Roboto Mono', monospace",
    fontSize: 14,
    background: "var(--bg)",
    borderRadius: "8px",
    "& .MuiOutlinedInput-notchedOutline": { borderColor: "var(--border)" },
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "var(--accent)" },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "var(--accent)" },
    "& .MuiSvgIcon-root": { color: "var(--text-muted)" },
};

export const TransactionDialogLableStyle = {
    display: "block",
    fontSize: 12,
    fontWeight: 700,
    color: "var(--text-muted)",
    textTransform: "uppercase",
    letterSpacing: "0.07em",
    marginBottom: 6,
    fontFamily: "'Roboto Mono', monospace",
}

export const inputStyle = {
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