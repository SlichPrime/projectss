import { useStore } from "@/lib/store";
import { formatRupiah } from "@/lib/format";

export default function CustomerOrders() {
  const { state, currentUser } = useStore();
  const orders = state.orders.filter((o) => o.customerId === currentUser?.id);

  return (
    <div className="container py-10">
      <p className="text-xs uppercase tracking-[0.3em] text-oxblood">Orders</p>
      <h1 className="mt-2 font-display text-4xl">Your acquisitions</h1>

      {orders.length === 0 ? (
        <div className="mt-10 rounded-sm border border-dashed border-border p-16 text-center text-muted-foreground">
          No orders yet.
        </div>
      ) : (
        <div className="mt-8 space-y-6">
          {orders.map((o) => (
            <div key={o.id} className="rounded-sm border border-border bg-card">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/70 p-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">From</p>
                  <p className="font-display text-lg">{o.storeName}</p>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      o.status === "done"
                        ? "bg-[hsl(var(--grade-a))]/15 text-[hsl(var(--grade-a))]"
                        : "bg-gold/20 text-brown-deep"
                    }`}
                  >
                    {o.status === "done" ? "Completed" : "Pending"}
                  </span>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {new Date(o.createdAt).toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
              <div className="divide-y divide-border/60">
                {o.items.map((it) => (
                  <div key={it.productId} className="flex items-center gap-4 p-4">
                    <img src={it.imageUrl} alt={it.productName} className="h-16 w-16 rounded-sm object-cover" />
                    <div className="flex-1">
                      <p className="font-display text-base">{it.productName}</p>
                      <p className="text-xs text-muted-foreground">Qty {it.quantity} · {formatRupiah(it.price)} each</p>
                    </div>
                    <p className="font-display text-base text-oxblood">{formatRupiah(it.price * it.quantity)}</p>
                  </div>
                ))}
              </div>
              <div className="hairline flex justify-between p-4 font-display">
                <span>Total</span>
                <span className="text-oxblood">{formatRupiah(o.total)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}