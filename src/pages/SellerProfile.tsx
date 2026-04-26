import { useState, type FormEvent } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GradeBadge } from "@/components/GradeBadge";
import { useStore } from "@/lib/store";
import { formatRupiah } from "@/lib/format";
import type { Grade } from "@/lib/types";
import { toast } from "sonner";

export default function SellerProfile() {
  const { currentUser, state, addProduct, deleteProduct } = useStore();
  const [open, setOpen] = useState(false);

  // form
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [grade, setGrade] = useState<Grade>("A");
  const [stock, setStock] = useState("1");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!currentUser || currentUser.role !== "seller") return null;

  const myProducts = state.products.filter((p) => p.sellerId === currentUser.id);
  const inputCls = "mt-1 h-11 w-full rounded-sm border border-input bg-background px-3 text-sm outline-none focus:border-oxblood";
  const lbl = "text-xs uppercase tracking-widest text-muted-foreground";
  const Row = ({ label, value }: { label: string; value: string }) => (
    <div className="flex flex-col gap-1 border-b border-border/60 py-3 sm:flex-row sm:items-center sm:gap-6">
      <span className="w-32 shrink-0 text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
      <span className="text-sm">{value}</span>
    </div>
  );

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Required.";
    const priceN = Number(price);
    if (!priceN || priceN <= 0) errs.price = "Enter a price in rupiah.";
    const stockN = Number(stock);
    if (!Number.isInteger(stockN) || stockN < 0) errs.stock = "Enter a stock count.";
    if (!imageUrl.trim()) errs.imageUrl = "Image URL required (Cloudinary in production).";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const r = addProduct({ name, price: priceN, grade, stock: stockN, imageUrl, description });
    if (r.ok === false) {
      toast.error(r.error);
      return;
    }
    toast.success("Product listed.");
    setName(""); setPrice(""); setGrade("A"); setStock("1"); setImageUrl(""); setDescription("");
    setOpen(false);
  };

  return (
    <div className="container py-10">
      <p className="text-xs uppercase tracking-[0.3em] text-oxblood">Store</p>
      <h1 className="mt-2 font-display text-4xl">{currentUser.storeName}</h1>

      <div className="mt-8 grid gap-6 lg:grid-cols-[360px,1fr]">
        <div className="space-y-6">
          <div className="rounded-sm border border-border bg-card p-6">
            <h2 className="font-display text-xl">Account</h2>
            <Row label="Username" value={currentUser.username} />
            <Row label="Email" value={currentUser.email} />
          </div>
          <div className="rounded-sm border border-border bg-card p-6">
            <h2 className="font-display text-xl">Store address</h2>
            <Row label="Phone" value={currentUser.storeAddress.phone} />
            <Row label="City" value={currentUser.storeAddress.city} />
            <Row label="Postal code" value={currentUser.storeAddress.postalCode} />
            <Row label="Address" value={currentUser.storeAddress.addressLine} />
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-2xl">Listings ({myProducts.length})</h2>
            <Button onClick={() => setOpen((s) => !s)} className="bg-oxblood text-primary-foreground hover:bg-oxblood/90">
              <Plus className="mr-2 h-4 w-4" /> {open ? "Cancel" : "New listing"}
            </Button>
          </div>

          {open && (
            <form onSubmit={onSubmit} className="mb-6 grid grid-cols-1 gap-4 rounded-sm border border-border bg-card p-6 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className={lbl}>Product name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
                {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
              </div>
              <div>
                <label className={lbl}>Price (Rp)</label>
                <input type="number" min={0} value={price} onChange={(e) => setPrice(e.target.value)} className={inputCls} />
                {errors.price && <p className="mt-1 text-xs text-destructive">{errors.price}</p>}
              </div>
              <div>
                <label className={lbl}>Stock</label>
                <input type="number" min={0} value={stock} onChange={(e) => setStock(e.target.value)} className={inputCls} />
                {errors.stock && <p className="mt-1 text-xs text-destructive">{errors.stock}</p>}
              </div>
              <div>
                <label className={lbl}>Grade</label>
                <select value={grade} onChange={(e) => setGrade(e.target.value as Grade)} className={inputCls}>
                  <option value="S">S — Pristine</option>
                  <option value="A">A — Excellent</option>
                  <option value="B">B — Good</option>
                  <option value="C">C — Fair</option>
                  <option value="D">D — Worn</option>
                </select>
              </div>
              <div>
                <label className={lbl}>Image URL</label>
                <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className={inputCls} placeholder="https://…" />
                {errors.imageUrl && <p className="mt-1 text-xs text-destructive">{errors.imageUrl}</p>}
              </div>
              <div className="md:col-span-2">
                <label className={lbl}>Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="mt-1 w-full rounded-sm border border-input bg-background p-3 text-sm outline-none focus:border-oxblood" />
              </div>
              <div className="md:col-span-2">
                <Button type="submit" className="bg-oxblood text-primary-foreground hover:bg-oxblood/90">Publish listing</Button>
              </div>
            </form>
          )}

          {myProducts.length === 0 ? (
            <div className="rounded-sm border border-dashed border-border p-16 text-center text-muted-foreground">
              No listings yet. Add your first salvaged item.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {myProducts.map((p) => (
                <div key={p.id} className="flex gap-3 rounded-sm border border-border bg-card p-3">
                  <img src={p.imageUrl} alt={p.name} className="h-20 w-20 rounded-sm object-cover" />
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-display text-sm leading-tight">{p.name}</p>
                      <GradeBadge grade={p.grade} size="sm" />
                    </div>
                    <p className="mt-1 font-display text-sm text-oxblood">{formatRupiah(p.price)}</p>
                    <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground">
                      <span>Stock: {p.stock}</span>
                      <button
                        onClick={() => { deleteProduct(p.id); toast.success("Deleted."); }}
                        className="rounded-sm p-1.5 hover:bg-muted hover:text-destructive"
                        aria-label="Delete"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}