import { AdminTitle } from "@/admin/components/AdminTitle";
import { Navigate, useParams } from "react-router";

import { useState } from "react";
import { X, Plus, Upload, Tag, SaveAll } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { useProduct } from "@/hooks/useProduct";
import { CustomLoader } from "@/components/CustomLoader";
import { ProductForm } from "@/admin/components/ProductForm";

interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  slug: string;
  stock: number;
  sizes: string[];
  gender: string;
  tags: string[];
  images: string[];
}

export const AdminProductPage = () => {
  const { data, isLoading, isError, handleSubmitProduct } = useProduct();

  const title = data?.id === "new" ? "New product" : "Edit product";
  const subtitle =
    data?.id === "new"
      ? "You can create a new product here"
      : "You can edit the product here";

  if (isError) {
    return <Navigate to="/admin/products" />;
  }
  if (isLoading) return <CustomLoader />;

  if (data) {
    return (
      <ProductForm
        product={data}
        title={title}
        subtitle={subtitle}
        onSubmit={handleSubmitProduct}
      />
    );
  }

  return <Navigate to="/admin/products" />;
};
