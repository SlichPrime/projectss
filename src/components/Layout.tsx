import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="mt-16 border-t border-border/70 bg-brown-deep text-cream">
        <div className="container py-10 text-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p className="font-display text-lg">Second<span className="text-gold">Cycle</span></p>
            <p className="text-cream/70">Discarded items, second lives. Jakarta · Bandung · Yogyakarta.</p>
            <p className="text-cream/50">© {new Date().getFullYear()} SecondCycle</p>
          </div>
        </div>
      </footer>
    </div>
  );
}