import { createBrowserRouter, Navigate } from "react-router";
import { ShopLayout } from "./shop/layout/ShopLayout.tsx";
import { HomePage } from "./shop/pages/home/HomePage.tsx";
import { ProductPage } from "./shop/pages/product/ProductPage.tsx";
import { GenderPage } from "./shop/pages/gender/GenderPage.tsx";
import { LoginPage } from "./auth/login/LoginPage.tsx";
import { RegisterPage } from "./auth/register/RegisterPage.tsx";
import { DashBoardPage } from "./admin/pages/dashboard/DashBoardPage.tsx";
import { AdminProductsPage } from "./admin/pages/products/AdminProductsPage.tsx";
import { AdminProductPage } from "./admin/pages/product/AdminProductPage.tsx";
import { lazy } from "react";
import {
  AdminRoute,
  NotAuthenticatedRoute,
} from "./components/routes/AuthCheckers.tsx";

const AuthLayout = lazy(() => import("./auth/layout/AuthLayout.tsx"));
const AdminLayout = lazy(() => import("./admin/layout/AdminLayout.tsx"));

export const appRouter = createBrowserRouter([
  // Public routes.
  {
    path: "/",
    element: <ShopLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/product/:idSlug",
        element: <ProductPage />,
      },
      {
        path: "/gender/:gender",
        element: <GenderPage />,
      },
    ],
  },
  // Auth routes
  {
    path: "/auth",
    element: (
      <NotAuthenticatedRoute>
        <AuthLayout />
      </NotAuthenticatedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/auth/login" />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
  //Admin routes
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      {
        index: true,
        element: <DashBoardPage />,
      },
      {
        path: "products",
        element: <AdminProductsPage />,
      },
      {
        path: "products/:id",
        element: <AdminProductPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);
