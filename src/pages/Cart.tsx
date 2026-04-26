import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { formatRupiah } from "@/lib/format";
import { toast } from "sonner";

export default function Cart() {
  const { cart, state, updateCartQty, removeFromCart, checkout } = useStore();
  const navigate = useNavigate();

  const lines = cart
    .map((ci) => ({ ci, p: state.products.find((p) => p.id === ci.productId) }))
    .filter((l): l is { ci: typeof cart[number]; p: NonNullable<typeof l.p> } => !!l.p);

  const total = lines.reduce((s, l) => s + l.p.price * l.ci.quantity, 0);

  const onCheckout = () => {
    const r = checkout();
    if (r.ok === false) {
      toast.error(r.error);
      return;
    }
    toast.success("Orders placed.");
    navigate("/orders");
  };

  return (
    <div className="container py-10">
      <p className="text-xs uppercase tracking-[0.3em] text-oxblood">Your cart</p>
      <h1 className="mt-2 font-display text-4xl">Hold for safekeeping</h1>

      {lines.length === 0 ? (
        <div className="mt-10 rounded-sm border border-dashed border-border p-16 text-center text-muted-foreground">
          Cart is empty.{" "}
          <Link to="/products" className="text-oxblood underline-offset-4 hover:underline">Browse the salvage</Link>.
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr,360px]">
          <div className="space-y-4">
            {lines.map(({ ci, p }) => (
              <div key={p.id} className="flex gap-4 rounded-sm border border-border bg-card p-4">
                <Link to={`/product/${p.id}`} className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-sm bg-muted">
                  <img src={p.imageUrl} alt={p.name} className="h-full w-full object-cover" />
                </Link>
                <div className="flex flex-1 flex-col">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">{p.storeName}</p>
                  <Link to={`/product/${p.id}`} className="font-display text-lg leading-snug hover:text-oxblood">
                    {p.name}
                  </Link>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="inline-flex items-center rounded-sm border border-border">
                      <button
                        className="flex h-8 w-8 items-center justify-center hover:bg-muted"
                        onClick={() => updateCartQty(p.id, ci.quantity - 1)}
                        aria-label="Decrease"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-10 text-center text-sm">{ci.quantity}</span>
                      <button
                        className="flex h-8 w-8 items-center justify-center hover:bg-muted"
                        onClick={() => updateCartQty(p.id, ci.quantity + 1)}
                        aria-label="Increase"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-base text-oxblood">{formatRupiah(p.price * ci.quantity)}</p>
                      <p className="text-xs text-muted-foreground">{formatRupiah(p.price)} each</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(p.id)}
                  className="self-start rounded-sm p-2 text-muted-foreground hover:bg-muted hover:text-destructive"
                  aria-label="Remove"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <aside className="h-fit rounded-sm border border-border bg-card p-6">
            <h2 className="font-display text-xl">Summary</h2>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Items</span>
                <span>{lines.reduce((s, l) => s + l.ci.quantity, 0)}</span>
              </div>
              <div className="hairline pt-3 flex justify-between font-display text-lg">
                <span>Total</span>
                <span className="text-oxblood">{formatRupiah(total)}</span>
              </div>
            </div>
            <Button onClick={onCheckout} className="mt-6 h-11 w-full bg-oxblood text-primary-foreground hover:bg-oxblood/90">
              Place order
            </Button>
          </aside>
        </div>
      )}
    </div>
  );
}