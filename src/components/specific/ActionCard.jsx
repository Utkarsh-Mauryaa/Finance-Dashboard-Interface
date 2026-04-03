const ActionCard = ({ title, value, icon, color }) => (
  <div className="
    bg-light-surface dark:bg-dark-surface
    border border-light-border dark:border-dark-border
    rounded-2xl p-4 sm:p-5
    flex items-center gap-4
    h-[100px]
    transition-colors duration-300
    hover:border-light-hover dark:hover:border-dark-hover
    group
  ">
    
    <div
      className="w-14 h-14 rounded-[14px] shrink-0 flex items-center justify-center text-[22px] transition-transform duration-200 group-hover:scale-105"
      style={{
        background: `${color}18`,
        border: `1px solid ${color}33`,
        color: color,
      }}
    >
      {icon}
    </div>

    <div>
      <p className="
        text-2xl font-bold m-0 leading-none
        text-light-text dark:text-dark-text
        font-['Roboto']
      ">
        {value ?? "—"}
      </p>
      <p className="
        text-[12px] mt-1 mb-0
        text-light-subtle dark:text-dark-subtle
        font-['Roboto_Mono'] uppercase tracking-[0.06em]
      ">
        {title}
      </p>
    </div>
  </div>
);

export default ActionCard;