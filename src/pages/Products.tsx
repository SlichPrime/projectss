import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductCard } from "@/components/ProductCard";
import { useStore } from "@/lib/store";
import type { Grade } from "@/lib/types";

type Sort =
  | "price-desc"
  | "price-asc"
  | "name-asc"
  | "name-desc"
  | "grade";

const GRADE_ORDER: Grade[] = ["S", "A", "B", "C", "D"];

export default function Products() {
  const { state } = useStore();
  const [params, setParams] = useSearchParams();
  const initialQ = params.get("q") ?? "";
  const [q, setQ] = useState(initialQ);
  const [sort, setSort] = useState<Sort>("price-desc");
  const [gradeFilter, setGradeFilter] = useState<Grade | "all">("all");

  useEffect(() => {
    setQ(initialQ);
  }, [initialQ]);

  const list = useMemo(() => {
    let arr = state.products.filter((p) =>
      q.trim() ? p.name.toLowerCase().includes(q.toLowerCase()) || p.storeName.toLowerCase().includes(q.toLowerCase()) : true
    );
    if (gradeFilter !== "all") arr = arr.filter((p) => p.grade === gradeFilter);
    arr = [...arr].sort((a, b) => {
      switch (sort) {
        case "price-desc": return b.price - a.price;
        case "price-asc": return a.price - b.price;
        case "name-asc": return a.name.localeCompare(b.name);
        case "name-desc": return b.name.localeCompare(a.name);
        case "grade": return GRADE_ORDER.indexOf(a.grade) - GRADE_ORDER.indexOf(b.grade);
      }
    });
    return arr;
  }, [state.products, q, sort, gradeFilter]);

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setParams(q.trim() ? { q } : {});
  };

  return (
    <div className="container py-10">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-oxblood">All listings</p>
          <h1 className="mt-2 font-display text-4xl">{q ? `Results for "${q}"` : "The salvage"}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{list.length} item{list.length === 1 ? "" : "s"}</p>
        </div>
        <form onSubmit={onSearchSubmit} className="md:w-80">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products or stores…"
            className="h-11 w-full rounded-sm border border-input bg-background px-3 text-sm outline-none focus:border-oxblood"
          />
        </form>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-wrap items-center gap-3 rounded-sm border border-border bg-card p-4">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Sort</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="h-9 rounded-sm border border-input bg-background px-2 text-sm outline-none focus:border-oxblood"
          >
            <option value="price-desc">Price: high → low</option>
            <option value="price-asc">Price: low → high</option>
            <option value="name-asc">Name: A → Z</option>
            <option value="name-desc">Name: Z → A</option>
            <option value="grade">Grade: S → D</option>
          </select>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Grade</span>
          <button
            type="button"
            onClick={() => setGradeFilter("all")}
            className={`rounded-sm border px-3 py-1.5 text-xs ${
              gradeFilter === "all" ? "border-oxblood bg-oxblood text-primary-foreground" : "border-border hover:border-oxblood/60"
            }`}
          >
            All
          </button>
          {GRADE_ORDER.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGradeFilter(g)}
              className={`inline-flex items-center gap-1.5 rounded-sm border px-3 py-1.5 text-xs ${
                gradeFilter === g ? "border-oxblood bg-oxblood text-primary-foreground" : "border-border hover:border-oxblood/60"
              }`}
            >
              <span className={`grade-chip grade-${g} h-5 w-5 text-[10px]`}>{g}</span>
            </button>
          ))}
        </div>
      </div>

      {list.length === 0 ? (
        <div className="rounded-sm border border-dashed border-border p-16 text-center text-muted-foreground">
          No items match your search. Try widening the grade filter.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}