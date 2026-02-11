import { NavLink } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  LayoutDashboard,
  FileText,
  Users,
  Activity,
  LogOut,
  X,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { to: "/admin", icon: LayoutDashboard, label: "Tableau de bord", end: true },
  { to: "/admin/invoices", icon: FileText, label: "Factures" },
  { to: "/admin/clients", icon: Users, label: "Clients" },
  { to: "/admin/activity", icon: Activity, label: "Activités" },
];

interface AdminSidebarProps {
  open: boolean;
  onClose: () => void;
}

const AdminSidebar = ({ open, onClose }: AdminSidebarProps) => {
  const { signOut } = useAuth();

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform bg-primary text-primary-foreground transition-transform duration-200 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-accent" />
            <span className="font-bold text-lg">LEVELING</span>
          </div>
          <Button variant="ghost" size="icon" className="lg:hidden text-primary-foreground" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex flex-col gap-1 px-3 py-4">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-primary-foreground/70 hover:bg-white/10 hover:text-primary-foreground"
                )
              }
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-white/10">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-primary-foreground/70 hover:text-primary-foreground hover:bg-white/10"
            onClick={signOut}
          >
            <LogOut className="h-4 w-4" />
            Déconnexion
          </Button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
