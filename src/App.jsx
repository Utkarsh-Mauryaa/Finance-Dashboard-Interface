import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { LayoutLoaderDashboard } from "./components/layout/Loaders";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Transactions = lazy(() => import("./pages/Transactions"));
const Insights = lazy(() => import("./pages/Insights"));


function App() {
  return (
    <BrowserRouter>
    <Suspense fallback={<LayoutLoaderDashboard />}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/insights" element={<Insights />} />
      </Routes>
      </Suspense>
      <Toaster position="top-center" />
    </BrowserRouter>
  )
}

export default App
