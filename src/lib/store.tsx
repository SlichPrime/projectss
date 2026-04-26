import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { SEED_PRODUCTS, SEED_USERS } from "./seed";
import type { CartItem, Order, OrderItem, OrderStatus, Product, User } from "./types";

const LS_KEY = "secondcycle:v1";

interface PersistShape {
  users: User[];
  products: Product[];
  carts: Record<string, CartItem[]>; // customerId -> items
  orders: Order[];
  currentUserId: string | null;
}

const initial: PersistShape = {
  users: SEED_USERS,
  products: SEED_PRODUCTS,
  carts: {},
  orders: [],
  currentUserId: null,
};

function load(): PersistShape {
  if (typeof window === "undefined") return initial;
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return initial;
    return { ...initial, ...JSON.parse(raw) };
  } catch {
    return initial;
  }
}

interface StoreCtx {
  state: PersistShape;
  currentUser: User | null;
  // auth
  login: (email: string, password: string) => { ok: true; user: User } | { ok: false; error: string };
  logout: () => void;
  registerCustomer: (data: { username: string; email: string; password: string; address: Address }) => Result;
  registerSeller: (data: { username: string; email: string; password: string; storeName: string; storeAddress: Address }) => Result;
  // products
  addProduct: (data: Omit<Product, "id" | "sellerId" | "storeName" | "createdAt">) => Result;
  deleteProduct: (id: string) => void;
  // cart
  addToCart: (productId: string, quantity?: number) => Result;
  updateCartQty: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cart: CartItem[];
  // orders
  checkout: () => Result;
  setOrderStatus: (orderId: string, status: OrderStatus) => void;
  // admin
  deleteUser: (id: string) => void;
}

type Result = { ok: true } | { ok: false; error: string };
type Address = { phone: string; city: string; postalCode: string; addressLine: string };

const StoreContext = createContext<StoreCtx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PersistShape>(() => load());

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(state));
    } catch {
      // ignore quota
    }
  }, [state]);

  const currentUser = useMemo(
    () => state.users.find((u) => u.id === state.currentUserId) ?? null,
    [state.users, state.currentUserId]
  );

  const cart = useMemo(() => {
    if (!currentUser || currentUser.role !== "customer") return [];
    return state.carts[currentUser.id] ?? [];
  }, [state.carts, currentUser]);

  const login: StoreCtx["login"] = useCallback((email, password) => {
    const user = state.users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!user) return { ok: false, error: "Invalid email or password." };
    setState((s) => ({ ...s, currentUserId: user.id }));
    return { ok: true, user };
  }, [state.users]);

  const logout = useCallback(() => {
    setState((s) => ({ ...s, currentUserId: null }));
  }, []);

  const checkUnique = (username: string, email: string) => {
    const u = username.trim().toLowerCase();
    const e = email.trim().toLowerCase();
    return !state.users.some(
      (x) => x.username.toLowerCase() === u || x.email.toLowerCase() === e
    );
  };

  const registerCustomer: StoreCtx["registerCustomer"] = (data) => {
    if (!checkUnique(data.username, data.email)) {
      return { ok: false, error: "Username or email already exists." };
    }
    const id = `u-${Date.now()}`;
    const user: User = {
      id,
      role: "customer",
      username: data.username.trim(),
      email: data.email.trim(),
      password: data.password,
      address: data.address,
    };
    setState((s) => ({ ...s, users: [...s.users, user], currentUserId: id }));
    return { ok: true };
  };

  const registerSeller: StoreCtx["registerSeller"] = (data) => {
    if (!checkUnique(data.username, data.email)) {
      return { ok: false, error: "Username or email already exists." };
    }
    const id = `u-${Date.now()}`;
    const user: User = {
      id,
      role: "seller",
      username: data.username.trim(),
      email: data.email.trim(),
      password: data.password,
      storeName: data.storeName.trim(),
      storeAddress: data.storeAddress,
    };
    setState((s) => ({ ...s, users: [...s.users, user], currentUserId: id }));
    return { ok: true };
  };

  const addProduct: StoreCtx["addProduct"] = (data) => {
    if (!currentUser || currentUser.role !== "seller")
      return { ok: false, error: "Only sellers can add products." };
    const product: Product = {
      ...data,
      id: `p-${Date.now()}`,
      sellerId: currentUser.id,
      storeName: currentUser.storeName,
      createdAt: Date.now(),
    };
    setState((s) => ({ ...s, products: [product, ...s.products] }));
    return { ok: true };
  };

  const deleteProduct: StoreCtx["deleteProduct"] = (id) => {
    setState((s) => ({ ...s, products: s.products.filter((p) => p.id !== id) }));
  };

  const addToCart: StoreCtx["addToCart"] = (productId, quantity = 1) => {
    if (!currentUser || currentUser.role !== "customer")
      return { ok: false, error: "Sign in as a customer to add items." };
    const cid = currentUser.id;
    let already = false;
    setState((s) => {
      const items = s.carts[cid] ?? [];
      if (items.some((i) => i.productId === productId)) {
        already = true;
        return s;
      }
      return { ...s, carts: { ...s.carts, [cid]: [...items, { productId, quantity }] } };
    });
    if (already) return { ok: false, error: "Item is already in your cart." };
    return { ok: true };
  };

  const updateCartQty: StoreCtx["updateCartQty"] = (productId, quantity) => {
    if (!currentUser || currentUser.role !== "customer") return;
    const cid = currentUser.id;
    setState((s) => {
      const items = (s.carts[cid] ?? []).map((i) =>
        i.productId === productId ? { ...i, quantity: Math.max(1, quantity) } : i
      );
      return { ...s, carts: { ...s.carts, [cid]: items } };
    });
  };

  const removeFromCart: StoreCtx["removeFromCart"] = (productId) => {
    if (!currentUser || currentUser.role !== "customer") return;
    const cid = currentUser.id;
    setState((s) => ({
      ...s,
      carts: { ...s.carts, [cid]: (s.carts[cid] ?? []).filter((i) => i.productId !== productId) },
    }));
  };

  const clearCart: StoreCtx["clearCart"] = () => {
    if (!currentUser || currentUser.role !== "customer") return;
    const cid = currentUser.id;
    setState((s) => ({ ...s, carts: { ...s.carts, [cid]: [] } }));
  };

  const checkout: StoreCtx["checkout"] = () => {
    if (!currentUser || currentUser.role !== "customer")
      return { ok: false, error: "Sign in as a customer to checkout." };
    const items = state.carts[currentUser.id] ?? [];
    if (items.length === 0) return { ok: false, error: "Your cart is empty." };

    // Group by seller
    const bySeller = new Map<string, OrderItem[]>();
    for (const ci of items) {
      const p = state.products.find((x) => x.id === ci.productId);
      if (!p) continue;
      const arr = bySeller.get(p.sellerId) ?? [];
      arr.push({
        productId: p.id,
        productName: p.name,
        price: p.price,
        quantity: ci.quantity,
        imageUrl: p.imageUrl,
      });
      bySeller.set(p.sellerId, arr);
    }

    const newOrders: Order[] = [];
    for (const [sellerId, orderItems] of bySeller) {
      const seller = state.users.find((u) => u.id === sellerId);
      if (!seller || seller.role !== "seller") continue;
      newOrders.push({
        id: `o-${Date.now()}-${sellerId}`,
        customerId: currentUser.id,
        customerName: currentUser.username,
        sellerId,
        storeName: seller.storeName,
        items: orderItems,
        total: orderItems.reduce((s, i) => s + i.price * i.quantity, 0),
        status: "pending",
        createdAt: Date.now(),
      });
    }

    setState((s) => ({
      ...s,
      orders: [...newOrders, ...s.orders],
      carts: { ...s.carts, [currentUser.id]: [] },
    }));
    return { ok: true };
  };

  const setOrderStatus: StoreCtx["setOrderStatus"] = (orderId, status) => {
    setState((s) => ({
      ...s,
      orders: s.orders.map((o) => (o.id === orderId ? { ...o, status } : o)),
    }));
  };

  const deleteUser: StoreCtx["deleteUser"] = (id) => {
    setState((s) => ({
      ...s,
      users: s.users.filter((u) => u.id !== id),
      products: s.products.filter((p) => p.sellerId !== id),
    }));
  };

  const value: StoreCtx = {
    state,
    currentUser,
    login,
    logout,
    registerCustomer,
    registerSeller,
    addProduct,
    deleteProduct,
    addToCart,
    updateCartQty,
    removeFromCart,
    clearCart,
    cart,
    checkout,
    setOrderStatus,
    deleteUser,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}