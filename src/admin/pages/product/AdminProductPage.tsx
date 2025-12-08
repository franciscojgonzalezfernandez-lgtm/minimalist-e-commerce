import { Navigate, useNavigate } from "react-router";

import { useProduct } from "@/hooks/useProduct";
import type { Product } from "@/interfaces/Product";
import { toast } from "sonner";
import { ProductForm } from "@/admin/components/ProductForm";
import { CustomLoader } from "@/components/CustomLoader";

export const AdminProductPage = () => {
  const { data, isLoading, isError, mutation } = useProduct();
  const navigate = useNavigate();

  const title = data?.id === "new" ? "New product" : "Edit product";

  const handleSumbit = async (productLike: Partial<Product>) => {
    await mutation.mutateAsync(productLike, {
      onSuccess: (data) => {
        toast.success("Product updated correctly", {
          position: "top-right",
          closeButton: true,
        });
        navigate(`/admin/products/${data.id}`);
      },
      onError: (error) => {
        console.log(error);
        toast.error("Something went wrong updating the product", {
          dismissible: true,
          position: "top-right",
          closeButton: true,
        });
      },
    });
  };
  const subtitle =
    data?.id === "new"
      ? "You can create a product here"
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
        onSubmit={handleSumbit}
      />
    );
  }

  return <Navigate to="/admin/products" />;
};
