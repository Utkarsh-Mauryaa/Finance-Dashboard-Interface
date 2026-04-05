
export const darkTheme = {
  bg:            "#0d0f14",
  surface:       "#13161e",
  surface2:      "#1a1e28",
  border:        "#1e2330",
  borderLight:   "rgba(255,255,255,0.07)",
  accent:        "#63dcbe",
  accentHover:   "#4ecfb0",
  accentRose:    "#e05c7a",
  accentAmber:   "#ffa31a",
  accentViolet:  "#a78bfa",
  accentCyan:    "#00d4ff",
  text:          "#e8eaf0",
  textMuted:     "#5a607a",
  textDim:       "#8890a8",
};

export const lightTheme = {
  bg:            "#f0f2f7",
  surface:       "#ffffff",
  surface2:      "#f7f8fc",
  border:        "#e2e6f0",
  borderLight:   "rgba(0,0,0,0.07)",
  accent:        "#0faf8d",          
  accentHover:   "#0d9c7e",
  accentRose:    "#d44d6a",
  accentAmber:   "#e8960f",
  accentViolet:  "#7c5fe6",
  accentCyan:    "#0099cc",
  text:          "#0f1117",
  textMuted:     "#9ca3af",
  textDim:       "#6b7280",
};


export const getTheme = (mode = "dark") =>
  mode === "light" ? lightTheme : darkTheme;


export const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,300;1,400&family=Roboto+Mono:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400&display=swap');

  
  .dark, .dark * { box-sizing: border-box; }
  html.dark {
    --bg:            #0d0f14;
    --surface:       #13161e;
    --surface2:      #1a1e28;
    --border:        #1e2330;
    --border-light:  rgba(255,255,255,0.07);
    --accent:        #63dcbe;
    --accent-hover:  #4ecfb0;
    --accent-rose:   #e05c7a;
    --accent-amber:  #ffa31a;
    --accent-violet: #a78bfa;
    --accent-cyan:   #00d4ff;
    --text:          #e8eaf0;
    --text-muted:    #5a607a;
    --text-dim:      #8890a8;

    
    --shadow-card:   0 1px 3px rgba(0,0,0,0.5);
    --shadow-hover:  0 8px 32px rgba(0,0,0,0.4);
    --shadow-modal:  0 24px 80px rgba(0,0,0,0.7);

    
    scrollbar-color: #1e2330 transparent;
  }

  
  html:not(.dark) {
    --bg:            #f0f2f7;
    --surface:       #ffffff;
    --surface2:      #f7f8fc;
    --border:        #e2e6f0;
    --border-light:  rgba(0,0,0,0.07);
    --accent:        #0faf8d;
    --accent-hover:  #0d9c7e;
    --accent-rose:   #d44d6a;
    --accent-amber:  #e8960f;
    --accent-violet: #7c5fe6;
    --accent-cyan:   #0099cc;
    --text:          #0f1117;
    --text-muted:    #9ca3af;
    --text-dim:      #6b7280;

    --shadow-card:   0 1px 4px rgba(15,17,23,0.06), 0 4px 16px rgba(15,17,23,0.04);
    --shadow-hover:  0 8px 32px rgba(15,17,23,0.10);
    --shadow-modal:  0 24px 80px rgba(15,17,23,0.18);

    scrollbar-color: #e2e6f0 transparent;
  }

  /* ── Base reset ─────────────────────────────────────────────────────────── */
  *, *::before, *::after { box-sizing: border-box; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Roboto', sans-serif;
    font-size: 15px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background 0.3s, color 0.3s;
  }

  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 999px; }
  ::-webkit-scrollbar-thumb:hover { background: var(--text-muted); }

  
  .zorvyn-input {
    width: 100%;
    background: var(--surface2);
    border: 1px solid var(--border-light);
    border-radius: 12px;
    padding: 11px 16px;
    color: var(--text);
    font-size: 15px;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
    font-family: 'Roboto Mono', monospace;
  }
  .zorvyn-input::placeholder { color: var(--text-muted); }
  .zorvyn-input:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 15%, transparent);
  }

  .zorvyn-label {
    font-size: 12px;
    color: var(--text-dim);
    font-family: 'Roboto Mono', monospace;
    letter-spacing: 0.08em;
    margin-bottom: 6px;
    display: block;
    text-transform: uppercase;
  }

  
  .zorvyn-btn {
    background: var(--accent);
    color: var(--bg);
    border: none;
    border-radius: 10px;
    padding: 11px 22px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    font-family: 'Roboto', sans-serif;
    transition: transform 0.15s, box-shadow 0.15s, opacity 0.2s;
    letter-spacing: 0.3px;
    white-space: nowrap;
  }
  .zorvyn-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px color-mix(in srgb, var(--accent) 30%, transparent);
  }
  .zorvyn-btn:active  { transform: translateY(0); }
  .zorvyn-btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; box-shadow: none; }

  .zorvyn-btn-outline {
    background: transparent;
    color: var(--text);
    border: 1px solid var(--border-light);
    border-radius: 10px;
    padding: 10px 22px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    font-family: 'Roboto', sans-serif;
    transition: border-color 0.2s, color 0.2s, background 0.2s, transform 0.15s;
  }
  .zorvyn-btn-outline:hover {
    border-color: var(--accent);
    color: var(--accent);
    background: color-mix(in srgb, var(--accent) 6%, transparent);
    transform: translateY(-1px);
  }

  .zorvyn-btn-danger {
    background: transparent;
    color: var(--accent-rose);
    border: 1px solid color-mix(in srgb, var(--accent-rose) 30%, transparent);
    border-radius: 10px;
    padding: 10px 22px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    font-family: 'Roboto', sans-serif;
    transition: background 0.2s, transform 0.15s;
  }
  .zorvyn-btn-danger:hover {
    background: color-mix(in srgb, var(--accent-rose) 10%, transparent);
    transform: translateY(-1px);
  }

  
  .zorvyn-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
    box-shadow: var(--shadow-card);
    transition: background 0.3s, border-color 0.3s, box-shadow 0.2s;
  }
  .zorvyn-card:hover { box-shadow: var(--shadow-hover); }

  
  .zorvyn-err {
    color: var(--accent-rose);
    font-size: 12px;
    margin-top: 4px;
    font-family: 'Roboto Mono', monospace;
  }

  
  .MuiDialog-paper {
    background: var(--surface) !important;
    border: 1px solid var(--border) !important;
    border-radius: 20px !important;
    color: var(--text) !important;
    box-shadow: var(--shadow-modal) !important;
  }
  .MuiDialogTitle-root {
    color: var(--text) !important;
    font-family: 'Roboto', sans-serif !important;
    font-weight: 700 !important;
    border-bottom: 1px solid var(--border) !important;
  }
  .MuiDialogContentText-root {
    color: var(--text-dim) !important;
    font-family: 'Roboto Mono', monospace !important;
    font-size: 14px !important;
  }
  .MuiDialogContent-root { padding-top: 20px !important; }

  .MuiMenu-paper {
    background: var(--surface) !important;
    border: 1px solid var(--border) !important;
    border-radius: 14px !important;
    color: var(--text) !important;
    box-shadow: var(--shadow-modal) !important;
  }
  .MuiMenuItem-root {
    color: var(--text) !important;
    font-family: 'Roboto', sans-serif !important;
    font-size: 14px !important;
    border-radius: 8px !important;
    margin: 2px 6px !important;
  }
  .MuiMenuItem-root:hover {
    background: color-mix(in srgb, var(--accent) 8%, transparent) !important;
    color: var(--accent) !important;
  }

  .MuiTooltip-tooltip {
    background: var(--surface2) !important;
    color: var(--text) !important;
    border: 1px solid var(--border) !important;
    font-family: 'Roboto Mono', monospace !important;
    font-size: 12px !important;
    border-radius: 8px !important;
    padding: 6px 10px !important;
  }

  .MuiDrawer-paper {
    background: var(--surface) !important;
    border-right: 1px solid var(--border) !important;
  }

  .MuiTextField-root input {
    color: var(--text) !important;
    font-family: 'Roboto Mono', monospace !important;
  }
  .MuiTextField-root .MuiOutlinedInput-notchedOutline { border-color: var(--border-light) !important; }
  .MuiTextField-root .Mui-focused .MuiOutlinedInput-notchedOutline { border-color: var(--accent) !important; }
  .MuiInputLabel-root { color: var(--text-dim) !important; font-family: 'Roboto Mono', monospace !important; }
  .MuiInputLabel-root.Mui-focused { color: var(--accent) !important; }
  .MuiInputBase-root { background: var(--surface2) !important; }
  .MuiSelect-select { color: var(--text) !important; font-family: 'Roboto Mono', monospace !important; }

  
  .MuiDataGrid-root {
    background: var(--surface) !important;
    color: var(--text) !important;
    border-color: var(--border) !important;
    font-family: 'Roboto', sans-serif !important;
  }
  .MuiDataGrid-columnHeaders { background: var(--surface2) !important; border-bottom: 1px solid var(--border) !important; }
  .MuiDataGrid-columnHeader  { background: var(--surface2) !important; }
  .MuiDataGrid-columnHeaderTitle {
    color: var(--text-dim) !important;
    font-family: 'Roboto', sans-serif !important;
    font-weight: 700 !important;
    font-size: 13px !important;
    text-transform: uppercase !important;
    letter-spacing: 0.06em !important;
  }
  .MuiDataGrid-columnSeparator { display: none !important; }
  .MuiDataGrid-cell {
    color: var(--text) !important;
    border-bottom: none !important;
    font-family: 'Roboto', sans-serif !important;
    font-size: 14px !important;
  }
  .MuiDataGrid-cell:focus, .MuiDataGrid-cell:focus-within { outline: none !important; }
  .MuiDataGrid-row { border-bottom: 1px solid color-mix(in srgb, var(--border) 60%, transparent) !important; }
  .MuiDataGrid-row:hover          { background: color-mix(in srgb, var(--accent) 4%, transparent) !important; }
  .MuiDataGrid-row.Mui-selected   { background: color-mix(in srgb, var(--accent) 8%, transparent) !important; }
  .MuiDataGrid-footerContainer { background: var(--surface2) !important; border-top: 1px solid var(--border) !important; }
  .MuiDataGrid-filler, .MuiDataGrid-filler > div { background: var(--surface2) !important; border-top: none !important; }
  .MuiTablePagination-root { color: var(--text-dim) !important; font-family: 'Roboto Mono', monospace !important; font-size: 13px !important; }
  .MuiTablePagination-actions button { color: var(--text-dim) !important; }
  .MuiTablePagination-actions button:hover { color: var(--accent) !important; }
  .MuiCheckbox-root { color: var(--text-muted) !important; }
  .MuiCheckbox-root.Mui-checked { color: var(--accent) !important; }

  
  .MuiDataGrid-paper,
  .MuiDataGrid-panelContent,
  .MuiDataGrid-panelHeader,
  .MuiDataGrid-panelFooter {
    background: var(--surface2) !important;
    color: var(--text) !important;
    border-color: var(--border) !important;
  }
  .MuiDataGrid-menuList { background: var(--surface2) !important; padding: 4px !important; }
  .MuiDataGrid-menuList .MuiMenuItem-root { color: var(--text) !important; font-size: 14px !important; border-radius: 6px !important; }
  .MuiDataGrid-menuList .MuiMenuItem-root:hover { background: color-mix(in srgb, var(--accent) 8%, transparent) !important; color: var(--accent) !important; }
  .MuiDataGrid-menuList .MuiDivider-root { border-color: var(--border) !important; }
  .MuiDataGrid-paper .MuiButton-root { color: var(--accent) !important; font-family: 'Roboto', sans-serif !important; }
  .MuiDataGrid-paper .MuiButton-root:hover { background: color-mix(in srgb, var(--accent) 8%, transparent) !important; }
  .MuiDataGrid-paper .MuiSvgIcon-root { color: var(--text-dim) !important; }
  .MuiDataGrid-paper .MuiInputBase-root { color: var(--text) !important; font-family: 'Roboto Mono', monospace !important; }

  .table-header {
    background: var(--surface2) !important;
    color: var(--text-dim) !important;
    font-family: 'Roboto', sans-serif !important;
    font-weight: 700 !important;
  }

  
  .MuiIconButton-root { color: var(--text-dim) !important; transition: color 0.15s !important; }
  .MuiIconButton-root:hover { color: var(--accent) !important; background: color-mix(in srgb, var(--accent) 8%, transparent) !important; }
  .MuiCircularProgress-root { color: var(--accent) !important; }
  .MuiSkeleton-root { background: color-mix(in srgb, var(--text) 6%, transparent) !important; }

  /* Light-specific lift for MUI surfaces */
  html:not(.dark) .MuiDialog-paper,
  html:not(.dark) .MuiMenu-paper,
  html:not(.dark) .MuiDrawer-paper,
  html:not(.dark) .MuiDataGrid-paper {
    box-shadow: 0 8px 40px rgba(15,17,23,0.12) !important;
  }
`;