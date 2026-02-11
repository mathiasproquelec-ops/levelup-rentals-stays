import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminOverview from "@/components/admin/AdminOverview";
import AdminInvoices from "@/components/admin/AdminInvoices";
import AdminClients from "@/components/admin/AdminClients";
import AdminActivity from "@/components/admin/AdminActivity";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  const { user, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 lg:ml-64">
        <header className="sticky top-0 z-30 flex items-center gap-4 border-b bg-card px-4 py-3 lg:px-6">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-foreground">Admin Dashboard</h1>
        </header>
        <main className="p-4 lg:p-6">
          <Routes>
            <Route index element={<AdminOverview />} />
            <Route path="invoices" element={<AdminInvoices />} />
            <Route path="clients" element={<AdminClients />} />
            <Route path="activity" element={<AdminActivity />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
