import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminClients = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [clients, setClients] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({ full_name: "", email: "", phone: "", address: "", city: "Dakar", status: "nouveau", notes: "" });

  useEffect(() => { fetchClients(); }, []);

  const fetchClients = async () => {
    const { data } = await supabase.from("clients").select("*").order("created_at", { ascending: false });
    setClients(data || []);
  };

  const handleSave = async () => {
    if (!form.full_name) {
      toast({ title: "Erreur", description: "Le nom est requis.", variant: "destructive" });
      return;
    }

    if (editing) {
      const { error } = await supabase.from("clients").update(form).eq("id", editing.id);
      if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
      await supabase.from("activity_logs").insert({ user_id: user?.id, action: `Client ${form.full_name} modifié`, entity_type: "client", entity_id: editing.id });
      toast({ title: "Client modifié" });
    } else {
      const { error } = await supabase.from("clients").insert({ ...form, created_by: user?.id });
      if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
      await supabase.from("activity_logs").insert({ user_id: user?.id, action: `Client ${form.full_name} ajouté`, entity_type: "client" });
      toast({ title: "Client ajouté" });
    }

    setOpen(false);
    setEditing(null);
    setForm({ full_name: "", email: "", phone: "", address: "", city: "Dakar", status: "nouveau", notes: "" });
    fetchClients();
  };

  const handleEdit = (client: any) => {
    setEditing(client);
    setForm({ full_name: client.full_name, email: client.email || "", phone: client.phone || "", address: client.address || "", city: client.city || "Dakar", status: client.status, notes: client.notes || "" });
    setOpen(true);
  };

  const handleDelete = async (client: any) => {
    if (!confirm(`Supprimer ${client.full_name} ?`)) return;
    await supabase.from("clients").delete().eq("id", client.id);
    await supabase.from("activity_logs").insert({ user_id: user?.id, action: `Client ${client.full_name} supprimé`, entity_type: "client", entity_id: client.id });
    toast({ title: "Client supprimé" });
    fetchClients();
  };

  const statusBadge = (status: string) => {
    const map: Record<string, string> = { vip: "bg-gold text-white", regulier: "bg-accent text-white", nouveau: "bg-muted text-foreground" };
    return <Badge className={map[status] || ""}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Gestion des Clients</h2>
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) { setEditing(null); setForm({ full_name: "", email: "", phone: "", address: "", city: "Dakar", status: "nouveau", notes: "" }); } }}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="h-4 w-4" /> Nouveau Client</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{editing ? "Modifier" : "Ajouter"} un client</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div><Label>Nom complet *</Label><Input value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Email</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
                <div><Label>Téléphone</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
              </div>
              <div><Label>Adresse</Label><Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Ville</Label><Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} /></div>
                <div>
                  <Label>Statut</Label>
                  <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nouveau">Nouveau</SelectItem>
                      <SelectItem value="regulier">Régulier</SelectItem>
                      <SelectItem value="vip">VIP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div><Label>Notes</Label><Textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></div>
              <Button className="w-full" onClick={handleSave}>{editing ? "Modifier" : "Ajouter"}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Téléphone</TableHead>
                <TableHead>Ville</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.length === 0 ? (
                <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">Aucun client</TableCell></TableRow>
              ) : (
                clients.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium">{c.full_name}</TableCell>
                    <TableCell>{c.email || "—"}</TableCell>
                    <TableCell>{c.phone || "—"}</TableCell>
                    <TableCell>{c.city}</TableCell>
                    <TableCell>{statusBadge(c.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(c)}><Pencil className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(c)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminClients;
