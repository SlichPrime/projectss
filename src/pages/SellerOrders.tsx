import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { formatRupiah } from "@/lib/format";

export default function SellerOrders() {
  const { state, currentUser, setOrderStatus } = useStore();
  if (!currentUser || currentUser.role !== "seller") return null;
  const orders = state.orders.filter((o) => o.sellerId === currentUser.id);

  return (
    <div className="container py-10">
      <p className="text-xs uppercase tracking-[0.3em] text-oxblood">Incoming orders</p>
      <h1 className="mt-2 font-display text-4xl">Fulfillment</h1>

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
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">Buyer</p>
                  <p className="font-display text-lg">{o.customerName}</p>
                  <p className="text-xs text-muted-foreground">{new Date(o.createdAt).toLocaleString("id-ID")}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      o.status === "done"
                        ? "bg-[hsl(var(--grade-a))]/15 text-[hsl(var(--grade-a))]"
                        : "bg-gold/20 text-brown-deep"
                    }`}
                  >
                    {o.status === "done" ? "Completed" : "Pending"}
                  </span>
                  {o.status === "pending" ? (
                    <Button size="sm" onClick={() => setOrderStatus(o.id, "done")} className="bg-oxblood text-primary-foreground hover:bg-oxblood/90">
                      Mark as done
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline" onClick={() => setOrderStatus(o.id, "pending")}>
                      Reopen
                    </Button>
                  )}
                </div>
              </div>
              <div className="divide-y divide-border/60">
                {o.items.map((it) => (
                  <div key={it.productId} className="flex items-center gap-4 p-4">
                    <img src={it.imageUrl} alt={it.productName} className="h-16 w-16 rounded-sm object-cover" />
                    <div className="flex-1">
                      <p className="font-display text-base">{it.productName}</p>
                      <p className="text-xs text-muted-foreground">Qty {it.quantity}</p>
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