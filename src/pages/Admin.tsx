import { useState } from "react";
import { Trash2, Users, Package } from "lucide-react";
import { useStore } from "@/lib/store";
import { GradeBadge } from "@/components/GradeBadge";
import { formatRupiah } from "@/lib/format";
import { toast } from "sonner";

export default function Admin() {
  const { state, deleteUser, deleteProduct } = useStore();
  const [tab, setTab] = useState<"users" | "products">("users");

  const sortedUsers = [...state.users].sort((a, b) => b.id.localeCompare(a.id));
  const sortedProducts = [...state.products].sort((a, b) => b.createdAt - a.createdAt);

  return (
    <div className="container py-10">
      <p className="text-xs uppercase tracking-[0.3em] text-oxblood">Admin console</p>
      <h1 className="mt-2 font-display text-4xl">Stewardship</h1>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-sm border border-border bg-card p-5">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Total users</p>
          <p className="mt-1 font-display text-3xl">{state.users.length}</p>
        </div>
        <div className="rounded-sm border border-border bg-card p-5">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Total products</p>
          <p className="mt-1 font-display text-3xl">{state.products.length}</p>
        </div>
      </div>

      <div className="mt-8 inline-flex rounded-sm border border-border p-1">
        <button
          onClick={() => setTab("users")}
          className={`inline-flex items-center gap-2 rounded-sm px-4 py-2 text-sm ${tab === "users" ? "bg-brown-deep text-cream" : "hover:bg-muted"}`}
        >
          <Users className="h-4 w-4" /> Users
        </button>
        <button
          onClick={() => setTab("products")}
          className={`inline-flex items-center gap-2 rounded-sm px-4 py-2 text-sm ${tab === "products" ? "bg-brown-deep text-cream" : "hover:bg-muted"}`}
        >
          <Package className="h-4 w-4" /> Products
        </button>
      </div>

      {tab === "users" ? (
        <div className="mt-6 overflow-hidden rounded-sm border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-left text-xs uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Username</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Detail</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 bg-card">
              {sortedUsers.map((u) => (
                <tr key={u.id}>
                  <td className="px-4 py-3 font-medium">{u.username}</td>
                  <td className="px-4 py-3 text-muted-foreground">{u.email}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs uppercase tracking-widest">{u.role}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {u.role === "seller" && `Store: ${u.storeName}`}
                    {u.role === "customer" && `City: ${u.address.city}`}
                    {u.role === "admin" && "—"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {u.role !== "admin" && (
                      <button
                        onClick={() => { deleteUser(u.id); toast.success("User removed."); }}
                        className="inline-flex items-center gap-1 rounded-sm border border-border px-2.5 py-1 text-xs hover:border-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((p) => (
            <div key={p.id} className="flex gap-3 rounded-sm border border-border bg-card p-3">
              <img src={p.imageUrl} alt={p.name} className="h-20 w-20 rounded-sm object-cover" />
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">{p.storeName}</p>
                    <p className="font-display text-sm leading-tight">{p.name}</p>
                  </div>
                  <GradeBadge grade={p.grade} size="sm" />
                </div>
                <p className="mt-1 font-display text-sm text-oxblood">{formatRupiah(p.price)}</p>
                <button
                  onClick={() => { deleteProduct(p.id); toast.success("Product deleted."); }}
                  className="mt-auto inline-flex items-center gap-1 self-end rounded-sm border border-border px-2.5 py-1 text-xs hover:border-destructive hover:text-destructive"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}