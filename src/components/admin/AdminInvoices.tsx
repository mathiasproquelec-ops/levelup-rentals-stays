import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Printer, Download, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface InvoiceItem {
  description: string;
  quantity: number;
  unit_price: number;
  total: number;
}

const AdminInvoices = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [invoices, setInvoices] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  // Form state
  const [clientId, setClientId] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [taxRate, setTaxRate] = useState(18);
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [items, setItems] = useState<InvoiceItem[]>([{ description: "", quantity: 1, unit_price: 0, total: 0 }]);

  useEffect(() => {
    fetchInvoices();
    fetchClients();
  }, []);

  const fetchInvoices = async () => {
    const { data } = await supabase
      .from("invoices")
      .select("*, clients(full_name, email, phone)")
      .order("created_at", { ascending: false });
    setInvoices(data || []);
  };

  const fetchClients = async () => {
    const { data } = await supabase.from("clients").select("id, full_name");
    setClients(data || []);
  };

  const updateItemRow = (index: number, field: string, value: string | number) => {
    const updated = [...items];
    (updated[index] as any)[field] = value;
    updated[index].total = Number(updated[index].quantity) * Number(updated[index].unit_price);
    setItems(updated);
  };

  const addItemRow = () => setItems([...items, { description: "", quantity: 1, unit_price: 0, total: 0 }]);
  const removeItemRow = (i: number) => setItems(items.filter((_, idx) => idx !== i));

  const subtotal = items.reduce((s, i) => s + i.total, 0);
  const taxAmount = (subtotal * taxRate) / 100;
  const total = subtotal + taxAmount - discount;

  const handleCreate = async () => {
    if (!clientId || !dueDate || items.some((i) => !i.description)) {
      toast({ title: "Erreur", description: "Remplissez tous les champs.", variant: "destructive" });
      return;
    }

    // Generate invoice number
    const { data: numData } = await supabase.rpc("generate_invoice_number");
    const invoiceNumber = numData || `LS-${new Date().getFullYear()}-000`;

    const { data: inv, error } = await supabase
      .from("invoices")
      .insert({
        invoice_number: invoiceNumber,
        client_id: clientId,
        due_date: dueDate,
        subtotal,
        tax_rate: taxRate,
        tax_amount: taxAmount,
        discount,
        total,
        payment_method: paymentMethod || null,
        created_by: user?.id,
      })
      .select()
      .single();

    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
      return;
    }

    // Insert items
    await supabase.from("invoice_items").insert(
      items.map((item) => ({
        invoice_id: inv.id,
        description: item.description,
        quantity: item.quantity,
        unit_price: item.unit_price,
        total: item.total,
      }))
    );

    // Log activity
    await supabase.from("activity_logs").insert({
      user_id: user?.id,
      action: `Facture ${invoiceNumber} créée`,
      entity_type: "invoice",
      entity_id: inv.id,
    });

    toast({ title: "Succès", description: `Facture ${invoiceNumber} créée.` });
    setOpen(false);
    resetForm();
    fetchInvoices();
  };

  const resetForm = () => {
    setClientId("");
    setDueDate("");
    setTaxRate(18);
    setDiscount(0);
    setPaymentMethod("");
    setItems([{ description: "", quantity: 1, unit_price: 0, total: 0 }]);
  };

  const handlePrint = (invoice: any) => {
    setSelectedInvoice(invoice);
    setPreviewOpen(true);
    setTimeout(() => window.print(), 300);
  };

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      payee: "bg-success text-white",
      en_attente: "bg-gold text-white",
      en_retard: "bg-destructive text-white",
    };
    const labels: Record<string, string> = { payee: "Payée", en_attente: "En attente", en_retard: "En retard" };
    return <Badge className={map[status] || ""}>{labels[status] || status}</Badge>;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Gestion des Factures</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> Nouvelle Facture
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Créer une facture</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Client</Label>
                  <Select value={clientId} onValueChange={setClientId}>
                    <SelectTrigger><SelectValue placeholder="Sélectionner" /></SelectTrigger>
                    <SelectContent>
                      {clients.map((c) => (
                        <SelectItem key={c.id} value={c.id}>{c.full_name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Date d'échéance</Label>
                  <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                </div>
              </div>

              <div>
                <Label>Lignes de facture</Label>
                {items.map((item, i) => (
                  <div key={i} className="grid grid-cols-12 gap-2 mt-2 items-end">
                    <div className="col-span-5">
                      <Input placeholder="Description" value={item.description} onChange={(e) => updateItemRow(i, "description", e.target.value)} />
                    </div>
                    <div className="col-span-2">
                      <Input type="number" placeholder="Qté" value={item.quantity} onChange={(e) => updateItemRow(i, "quantity", Number(e.target.value))} />
                    </div>
                    <div className="col-span-3">
                      <Input type="number" placeholder="Prix unitaire" value={item.unit_price} onChange={(e) => updateItemRow(i, "unit_price", Number(e.target.value))} />
                    </div>
                    <div className="col-span-1 text-sm font-medium text-foreground pt-2">{item.total.toLocaleString("fr-FR")}</div>
                    <div className="col-span-1">
                      {items.length > 1 && (
                        <Button variant="ghost" size="icon" onClick={() => removeItemRow(i)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="mt-2" onClick={addItemRow}>+ Ajouter ligne</Button>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>TVA (%)</Label>
                  <Input type="number" value={taxRate} onChange={(e) => setTaxRate(Number(e.target.value))} />
                </div>
                <div>
                  <Label>Remise (FCFA)</Label>
                  <Input type="number" value={discount} onChange={(e) => setDiscount(Number(e.target.value))} />
                </div>
                <div>
                  <Label>Méthode de paiement</Label>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger><SelectValue placeholder="Choisir" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wave">Wave</SelectItem>
                      <SelectItem value="orange_money">Orange Money</SelectItem>
                      <SelectItem value="carte">Carte bancaire</SelectItem>
                      <SelectItem value="virement">Virement</SelectItem>
                      <SelectItem value="especes">Espèces</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="border-t pt-4 space-y-1 text-sm">
                <div className="flex justify-between"><span>Sous-total</span><span>{subtotal.toLocaleString("fr-FR")} FCFA</span></div>
                <div className="flex justify-between"><span>TVA ({taxRate}%)</span><span>{taxAmount.toLocaleString("fr-FR")} FCFA</span></div>
                <div className="flex justify-between"><span>Remise</span><span>-{discount.toLocaleString("fr-FR")} FCFA</span></div>
                <div className="flex justify-between font-bold text-base border-t pt-2"><span>Total</span><span>{total.toLocaleString("fr-FR")} FCFA</span></div>
              </div>

              <Button className="w-full" onClick={handleCreate}>Créer la facture</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>N° Facture</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">Aucune facture</TableCell>
                </TableRow>
              ) : (
                invoices.map((inv) => (
                  <TableRow key={inv.id}>
                    <TableCell className="font-mono text-sm">{inv.invoice_number}</TableCell>
                    <TableCell>{inv.clients?.full_name || "—"}</TableCell>
                    <TableCell>{new Date(inv.issue_date).toLocaleDateString("fr-FR")}</TableCell>
                    <TableCell className="font-semibold">{Number(inv.total).toLocaleString("fr-FR")} FCFA</TableCell>
                    <TableCell>{statusBadge(inv.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => handlePrint(inv)} title="Imprimer">
                          <Printer className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Télécharger PDF">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Print preview dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-2xl print:shadow-none">
          <DialogHeader>
            <DialogTitle>Aperçu Facture</DialogTitle>
          </DialogHeader>
          {selectedInvoice && (
            <div className="space-y-4 p-4 print:p-0" id="invoice-print">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-primary">LEVELING SERVICES GROUP</h2>
                  <p className="text-sm text-muted-foreground">Dakar, Sénégal</p>
                </div>
                <div className="text-right">
                  <p className="font-mono font-bold text-lg">{selectedInvoice.invoice_number}</p>
                  <p className="text-sm text-muted-foreground">
                    Émise le {new Date(selectedInvoice.issue_date).toLocaleDateString("fr-FR")}
                  </p>
                </div>
              </div>
              <div className="border-t pt-4">
                <p className="font-semibold">Client: {selectedInvoice.clients?.full_name}</p>
                <p className="text-sm text-muted-foreground">{selectedInvoice.clients?.email}</p>
              </div>
              <div className="border-t pt-4 text-right space-y-1">
                <p>Sous-total: {Number(selectedInvoice.subtotal).toLocaleString("fr-FR")} FCFA</p>
                <p>TVA ({selectedInvoice.tax_rate}%): {Number(selectedInvoice.tax_amount).toLocaleString("fr-FR")} FCFA</p>
                <p>Remise: -{Number(selectedInvoice.discount).toLocaleString("fr-FR")} FCFA</p>
                <p className="text-xl font-bold border-t pt-2">{Number(selectedInvoice.total).toLocaleString("fr-FR")} FCFA</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminInvoices;
