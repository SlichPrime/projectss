import { Link, useNavigate } from "react-router-dom";
import { useState, type FormEvent } from "react";
import { LogOut, Search, ShoppingBag, User as UserIcon, Package, Shield } from "lucide-react";
import { Logo } from "./Logo";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { currentUser, cart, logout } = useStore();
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    const term = q.trim();
    navigate(term ? `/products?q=${encodeURIComponent(term)}` : "/products");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="container flex h-16 items-center gap-4">
        <Logo />

        {currentUser?.role !== "admin" && (
          <form onSubmit={onSearch} className="ml-2 hidden flex-1 md:block">
            <div className="relative max-w-xl">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search the salvage…"
                className="h-10 w-full rounded-sm border border-border bg-background pl-9 pr-3 text-sm outline-none transition-colors focus:border-oxblood"
              />
            </div>
          </form>
        )}

        <nav className="ml-auto flex items-center gap-1">
          {!currentUser && (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link to="/login">Sign in</Link>
              </Button>
              <Button asChild size="sm" className="bg-oxblood text-primary-foreground hover:bg-oxblood/90">
                <Link to="/register">Join</Link>
              </Button>
            </>
          )}

          {currentUser?.role === "customer" && (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link to="/cart" className="relative">
                  <ShoppingBag className="h-4 w-4" />
                  <span className="ml-1.5 hidden sm:inline">Cart</span>
                  {cart.length > 0 && (
                    <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-oxblood px-1.5 text-[10px] font-semibold text-primary-foreground">
                      {cart.length}
                    </span>
                  )}
                </Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link to="/orders"><Package className="h-4 w-4 sm:mr-1.5" /><span className="hidden sm:inline">Orders</span></Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link to="/profile"><UserIcon className="h-4 w-4 sm:mr-1.5" /><span className="hidden sm:inline">Profile</span></Link>
              </Button>
            </>
          )}

          {currentUser?.role === "seller" && (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link to="/seller/orders"><Package className="h-4 w-4 sm:mr-1.5" /><span className="hidden sm:inline">Orders</span></Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link to="/seller/profile"><UserIcon className="h-4 w-4 sm:mr-1.5" /><span className="hidden sm:inline">Store</span></Link>
              </Button>
            </>
          )}

          {currentUser?.role === "admin" && (
            <Button asChild variant="ghost" size="sm">
              <Link to="/admin"><Shield className="h-4 w-4 sm:mr-1.5" /><span className="hidden sm:inline">Admin</span></Link>
            </Button>
          )}

          {currentUser && (
            <Button variant="ghost" size="sm" onClick={() => { logout(); navigate("/"); }}>
              <LogOut className="h-4 w-4" />
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}