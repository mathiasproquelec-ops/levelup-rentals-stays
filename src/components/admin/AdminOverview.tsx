import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { DollarSign, FileText, Users, AlertCircle, CheckCircle } from "lucide-react";

interface KPI {
  label: string;
  value: string;
  icon: React.ElementType;
  color: string;
}

const AdminOverview = () => {
  const [stats, setStats] = useState({ revenue: 0, invoiceCount: 0, paid: 0, unpaid: 0, clientCount: 0 });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [monthlyData, setMonthlyData] = useState<{ month: string; revenue: number }[]>([]);

  useEffect(() => {
    fetchStats();
    fetchActivity();
  }, []);

  const fetchStats = async () => {
    const [invoicesRes, clientsRes] = await Promise.all([
      supabase.from("invoices").select("total, status"),
      supabase.from("clients").select("id"),
    ]);

    const invoices = invoicesRes.data || [];
    const revenue = invoices.reduce((sum, i) => sum + Number(i.total), 0);
    const paid = invoices.filter((i) => i.status === "payee").length;
    const unpaid = invoices.filter((i) => i.status !== "payee").length;

    setStats({
      revenue,
      invoiceCount: invoices.length,
      paid,
      unpaid,
      clientCount: clientsRes.data?.length || 0,
    });

    // Build monthly chart data from invoices
    const byMonth: Record<string, number> = {};
    invoices.forEach((inv) => {
      const month = new Date().toLocaleDateString("fr-FR", { month: "short" });
      byMonth[month] = (byMonth[month] || 0) + Number(inv.total);
    });
    setMonthlyData(
      Object.entries(byMonth).map(([month, revenue]) => ({ month, revenue }))
    );
  };

  const fetchActivity = async () => {
    const { data } = await supabase
      .from("activity_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5);
    setRecentActivity(data || []);
  };

  const kpis: KPI[] = [
    { label: "Chiffre d'affaires", value: `${stats.revenue.toLocaleString("fr-FR")} FCFA`, icon: DollarSign, color: "text-accent" },
    { label: "Factures émises", value: String(stats.invoiceCount), icon: FileText, color: "text-accent" },
    { label: "Factures payées", value: String(stats.paid), icon: CheckCircle, color: "text-success" },
    { label: "Factures impayées", value: String(stats.unpaid), icon: AlertCircle, color: "text-destructive" },
    { label: "Clients actifs", value: String(stats.clientCount), icon: Users, color: "text-accent" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="shadow-card hover:shadow-card-hover transition-shadow">
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`p-3 rounded-lg bg-muted ${kpi.color}`}>
                <kpi.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{kpi.label}</p>
                <p className="text-lg font-bold text-foreground">{kpi.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-base">Revenus (Barres)</CardTitle></CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData.length ? monthlyData : [{ month: "Jan", revenue: 0 }]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(v: number) => `${v.toLocaleString("fr-FR")} FCFA`} />
                <Bar dataKey="revenue" fill="hsl(217, 91%, 60%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Évolution (Courbe)</CardTitle></CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData.length ? monthlyData : [{ month: "Jan", revenue: 0 }]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(v: number) => `${v.toLocaleString("fr-FR")} FCFA`} />
                <Line type="monotone" dataKey="revenue" stroke="hsl(217, 91%, 60%)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader><CardTitle className="text-base">Activités récentes</CardTitle></CardHeader>
        <CardContent>
          {recentActivity.length === 0 ? (
            <p className="text-sm text-muted-foreground">Aucune activité récente.</p>
          ) : (
            <ul className="space-y-2">
              {recentActivity.map((a) => (
                <li key={a.id} className="flex items-center gap-3 text-sm">
                  <span className="h-2 w-2 rounded-full bg-accent shrink-0" />
                  <span className="text-foreground">{a.action}</span>
                  <span className="ml-auto text-muted-foreground text-xs">
                    {new Date(a.created_at).toLocaleString("fr-FR")}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOverview;
