import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GradeBadge } from "@/components/GradeBadge";
import { useStore } from "@/lib/store";
import { formatRupiah, gradeLabel } from "@/lib/format";
import { toast } from "sonner";

export default function ProductDetail() {
  const { id } = useParams();
  const { state, currentUser, addToCart } = useStore();
  const navigate = useNavigate();
  const product = state.products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground">This item is no longer listed.</p>
        <Button asChild variant="link" className="mt-4">
          <Link to="/products">Back to listings</Link>
        </Button>
      </div>
    );
  }

  const onAdd = () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    if (currentUser.role !== "customer") {
      toast.error("Only customer accounts can add to cart.");
      return;
    }
    const r = addToCart(product.id, 1);
    if (r.ok === false) toast.error(r.error);
    else toast.success("Added to cart.");
  };

  return (
    <div className="container py-10">
      <Link to="/products" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to listings
      </Link>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="overflow-hidden rounded-sm border border-border bg-muted">
          <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-oxblood">{product.storeName}</p>
          <h1 className="mt-2 font-display text-4xl leading-tight">{product.name}</h1>

          <div className="mt-6 flex items-center gap-4">
            <GradeBadge grade={product.grade} size="lg" />
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Condition</p>
              <p className="font-display text-lg">Grade {product.grade} · {gradeLabel[product.grade]}</p>
            </div>
          </div>

          <div className="hairline mt-8 pt-6">
            <p className="font-display text-3xl text-oxblood">{formatRupiah(product.price)}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </p>
          </div>

          {product.description && (
            <p className="mt-6 leading-relaxed text-foreground/80">{product.description}</p>
          )}

          <Button
            onClick={onAdd}
            disabled={product.stock === 0}
            size="lg"
            className="mt-8 h-12 w-full bg-oxblood text-primary-foreground hover:bg-oxblood/90 sm:w-auto"
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
}