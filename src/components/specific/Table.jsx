import { DataGrid } from "@mui/x-data-grid";
import { PortalStyles } from "../../utils/styles";
import { DataGridStyles } from "../../utils/styles";


const Table = ({ rows, columns, heading, rowHeight = 52, processRowUpdate, action }) => (
  <div className="w-full flex-1 flex flex-col min-h-0">
    <PortalStyles />

    <div className="shrink-0" style={{ marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
      <div>
        <h2 style={{ color: "var(--text)", fontFamily: "'Roboto', sans-serif", fontWeight: 700, fontSize: 24, margin: 0 }}>
          {heading}
        </h2>
        <p style={{ color: "var(--text-muted)", fontFamily: "'Roboto Mono', monospace", fontSize: 13, marginTop: 4, marginBottom: 0 }}>
          {rows.length} record{rows.length !== 1 ? "s" : ""}
        </p>
      </div>
      {action && <div>{action}</div>}
    </div>

    <div className="table-container flex-1 min-h-0" style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        rowHeight={rowHeight}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={(err) => console.error("Row update error:", err)}
        sx={DataGridStyles()}
      />
    </div>
  </div>
);

export default Table;