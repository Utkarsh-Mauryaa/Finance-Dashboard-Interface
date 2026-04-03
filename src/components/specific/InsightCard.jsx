const InsightCard = ({ icon, label, value, sub, color, glow }) => {
  return (
    <div
      className="
        relative overflow-hidden
        bg-light-surface dark:bg-dark-surface
        border border-light-border dark:border-dark-border
        rounded-2xl px-[22px] py-5
        flex-1 basis-[220px] min-w-[200px]
        cursor-default
        transition-all duration-200
      "
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 4px 24px ${glow}`;
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "none";
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
      />

      {/* Icon badge */}
      <div
        className="w-9 h-9 rounded-[10px] flex items-center justify-center text-[18px] mb-[14px]"
        style={{ background: glow }}
      >
        {icon}
      </div>

      {/* Label */}
      <p className="
        m-0 mb-1.5
        text-[12px] font-bold uppercase tracking-[0.07em]
        text-light-subtle dark:text-dark-subtle
        font-['Roboto_Mono']
      ">
        {label}
      </p>

      {/* Main value */}
      <p
        className="m-0 mb-1.5 text-[24px] font-bold leading-[1.1] font-['Roboto']"
        style={{ color }}
      >
        {value}
      </p>

      {/* Sub text */}
      <p className="
        m-0 text-[13px] leading-relaxed
        text-light-subtle dark:text-dark-subtle
        font-['Roboto_Mono']
      ">
        {sub}
      </p>
    </div>
  );
};

export default InsightCard;