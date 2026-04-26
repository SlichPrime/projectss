import { Navigate, useLocation } from "react-router-dom";
import { useStore } from "@/lib/store";
import type { Role } from "@/lib/types";

export function RoleGuard({ allow, children }: { allow: Role[]; children: React.ReactNode }) {
  const { currentUser } = useStore();
  const location = useLocation();
  if (!currentUser) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  if (!allow.includes(currentUser.role)) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}