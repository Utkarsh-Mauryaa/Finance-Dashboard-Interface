

const ActionCard = ({ title, value, icon, color }) => (
  <div style={{
    background: "#13161e", border: "1px solid #1e2330", borderRadius: 16,
    padding: "20px", display: "flex", alignItems: "center", gap: 16, height: 100,
  }}>
    <div style={{
      width: 56, height: 56, borderRadius: 14, flexShrink: 0,
      background: `${color}18`, border: `1px solid ${color}33`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 22, color: color,
    }}>
      {icon}
    </div>
    <div>
      <p style={{ fontSize: 24, fontWeight: 800, color: "#e8eaf0", margin: 0, fontFamily: "'Syne',sans-serif", lineHeight: 1 }}>{value ?? "—"}</p>
      <p style={{ fontSize: 12, color: "#5a607a", margin: "4px 0 0", fontFamily: "'DM Mono',monospace", textTransform: "uppercase", letterSpacing: "0.06em" }}>{title}</p>
    </div>
  </div>
);

export default ActionCard