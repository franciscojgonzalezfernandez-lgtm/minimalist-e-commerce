import { useAuthStore } from "@/auth/store/auth.store";
import { CustomLoader } from "../CustomLoader";
import type { PropsWithChildren } from "react";
import { Navigate } from "react-router";

export const AuthenticatedRoute = ({ children }: PropsWithChildren) => {
  const { authStatus } = useAuthStore();
  if (authStatus === "checking") {
    return <CustomLoader />;
  }
  if (authStatus === "authenticated") {
    return children;
  }
  if (authStatus === "not-authenticated") {
    <Navigate to="/auth/login" />;
  }
};

export const NotAuthenticatedRoute = ({ children }: PropsWithChildren) => {
  const { authStatus } = useAuthStore();
  if (authStatus === "checking") {
    return <CustomLoader />;
  }
  if (authStatus === "not-authenticated") {
    return children;
  }
  if (authStatus === "authenticated") {
    return <Navigate to="/" />;
  }
};

export const AdminRoute = ({ children }: PropsWithChildren) => {
  const { isAdmin, authStatus } = useAuthStore();
  if (authStatus === "checking") {
    return <CustomLoader />;
  }
  if (authStatus === "not-authenticated") {
    return <Navigate to="/auth/login" />;
  }
  if (authStatus === "authenticated" && !isAdmin()) {
    return <Navigate to="/" />;
  }
  return children;
};
