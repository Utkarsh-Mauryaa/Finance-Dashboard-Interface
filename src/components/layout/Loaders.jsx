import { Skeleton } from "@mui/material";

const sx = { borderRadius: 2 };

export const LayoutLoaderAdmin = () => (
  <div className="p-2 bg-light-bg dark:bg-dark-bg min-h-screen">
    {Array.from({ length: 10 }).map((_, i) => (
      <Skeleton key={i} variant="rounded" height={60} sx={{ ...sx, mb: 1.5 }} />
    ))}
  </div>
);

export const LayoutLoaderDashboard = () => (
  <div
    className="lld-grid grid min-h-screen bg-light-bg dark:bg-dark-bg"
    style={{ gridTemplateColumns: "230px 1fr" }}
  >
    <style>{`@media(max-width:768px){.lld-sidebar{display:none!important}.lld-grid{grid-template-columns:1fr!important}}`}</style>

    <div className="lld-sidebar p-3 border-r border-light-border dark:border-dark-border">
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={i} variant="rounded" height={44} sx={{ ...sx, mb: 1.5 }} />
      ))}
    </div>

    <div className="p-4 sm:p-6">
      <Skeleton variant="rounded" height={64} sx={{ ...sx, mb: 3 }} />
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Skeleton variant="rounded" height={350} sx={sx} className="w-full sm:flex-[2]" />
        <Skeleton variant="rounded" height={350} sx={sx} className="w-full sm:flex-1" />
      </div>
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} variant="rounded" height={100} sx={sx} className="w-full sm:flex-1" />
        ))}
      </div>
    </div>
  </div>
);

export const LayoutLoaderInsights = () => (
  <div className="p-4 sm:p-6 max-w-[1200px] bg-light-bg dark:bg-dark-bg min-h-screen">
    <div className="flex flex-col sm:flex-row gap-5 flex-wrap mb-6">
      <Skeleton variant="rounded" height={380} sx={{ ...sx, flex: "2 1 420px", minWidth: 0 }} />
      <Skeleton variant="rounded" height={380} sx={{ ...sx, flex: "1 1 300px", minWidth: 0 }} />
    </div>
    <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} variant="rounded" height={120} sx={{ ...sx, flex: "1 1 220px", minWidth: 200 }} />
      ))}
    </div>
  </div>
);