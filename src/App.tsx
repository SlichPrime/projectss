import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/Layout";
import { RoleGuard } from "@/components/RoleGuard";
import { StoreProvider } from "@/lib/store";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import CustomerOrders from "./pages/CustomerOrders";
import CustomerProfile from "./pages/CustomerProfile";
import SellerOrders from "./pages/SellerOrders";
import SellerProfile from "./pages/SellerProfile";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <StoreProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route
                path="/cart"
                element={<RoleGuard allow={["customer"]}><Cart /></RoleGuard>}
              />
              <Route
                path="/orders"
                element={<RoleGuard allow={["customer"]}><CustomerOrders /></RoleGuard>}
              />
              <Route
                path="/profile"
                element={<RoleGuard allow={["customer"]}><CustomerProfile /></RoleGuard>}
              />
              <Route
                path="/seller/orders"
                element={<RoleGuard allow={["seller"]}><SellerOrders /></RoleGuard>}
              />
              <Route
                path="/seller/profile"
                element={<RoleGuard allow={["seller"]}><SellerProfile /></RoleGuard>}
              />
              <Route
                path="/admin"
                element={<RoleGuard allow={["admin"]}><Admin /></RoleGuard>}
              />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </StoreProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
