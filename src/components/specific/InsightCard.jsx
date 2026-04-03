const InsightCard = ({ icon, label, value, sub, color, glow }) => {
  return (
    <div
      style={{
        background: "#13161e",
        border: "1px solid #1e2330",
        borderRadius: 16,
        padding: "20px 22px",
        flex: "1 1 220px",
        minWidth: 200,
        position: "relative",
        overflow: "hidden",
        transition: "box-shadow 0.2s, transform 0.2s",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 4px 24px ${glow}`;
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "none";
      }}
    >
      {/* top accent line */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: 3,
        background: `linear-gradient(90deg, ${color}, transparent)`,
      }} />

      {/* icon badge */}
      <div style={{
        width: 36, height: 36, borderRadius: 10,
        background: glow,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 18, marginBottom: 14,
      }}>
        {icon}
      </div>

      {/* label */}
      <p style={{
        margin: 0,
        fontSize: 11,
        fontWeight: 700,
        color: "#5a607a",
        fontFamily: "'DM Mono', monospace",
        textTransform: "uppercase",
        letterSpacing: "0.07em",
        marginBottom: 6,
      }}>
        {label}
      </p>

      {/* main value */}
      <p style={{
        margin: 0,
        fontSize: 22,
        fontWeight: 800,
        color: color,
        fontFamily: "'Syne', sans-serif",
        lineHeight: 1.1,
        marginBottom: 6,
      }}>
        {value}
      </p>

      {/* sub text */}
      <p style={{
        margin: 0,
        fontSize: 12,
        color: "#5a607a",
        fontFamily: "'DM Mono', monospace",
        lineHeight: 1.5,
      }}>
        {sub}
      </p>
    </div>
  );
};

export default InsightCard;