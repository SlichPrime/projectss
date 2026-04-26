import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-salvaged.jpg";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { useStore } from "@/lib/store";

export default function Landing() {
  const { state, currentUser } = useStore();
  const featured = state.products.slice(0, 8);

  const isSeller = currentUser?.role === "seller";

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brown-deep text-cream">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="A still life of salvaged objects on velvet"
            width={1920}
            height={1080}
            className="h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brown-deep via-brown-deep/80 to-transparent" />
        </div>

        <div className="container relative py-24 md:py-36">
          <p className="mb-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-gold">
            <span className="h-px w-8 bg-gold" /> Est. 2025 · Indonesia
          </p>
          <h1 className="max-w-3xl font-display text-5xl font-semibold leading-[1.05] md:text-7xl">
            The salvage yard for <em className="font-normal italic text-gold">things worth saving.</em>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-cream/80">
            A graded marketplace for discarded objects with second lives. Every piece scored S to D, listed by independent sellers across the archipelago.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-oxblood text-primary-foreground hover:bg-oxblood/90">
              <Link to="/products">
                Browse the salvage <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            {isSeller ? (
              <Button asChild size="lg" variant="outline" className="border-gold/60 bg-transparent text-cream hover:bg-cream/10">
                <Link to="/seller/profile">Open your store</Link>
              </Button>
            ) : (
              <Button asChild size="lg" variant="outline" className="border-gold/60 bg-transparent text-cream hover:bg-cream/10">
                <Link to="/register">Start selling</Link>
              </Button>
            )}
          </div>

          {/* Grade legend */}
          <div className="mt-14 flex flex-wrap items-center gap-3 text-xs text-cream/70">
            <span className="uppercase tracking-widest text-gold">Grading</span>
            {(["S", "A", "B", "C", "D"] as const).map((g) => (
              <span key={g} className="inline-flex items-center gap-2 rounded-full border border-cream/20 px-3 py-1">
                <span className={`grade-chip grade-${g} h-5 w-5 text-[10px]`}>{g}</span>
                {g === "S" && "Pristine"}
                {g === "A" && "Excellent"}
                {g === "B" && "Good"}
                {g === "C" && "Fair"}
                {g === "D" && "Worn"}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="container py-16 md:py-24">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-oxblood">Curated this week</p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl">Newly listed</h2>
          </div>
          <Link to="/products" className="text-sm text-foreground underline-offset-4 hover:underline">
            See all →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}