import { getProductAction } from "@/actions/get-product.actions";
import type { Product } from "@/interfaces/Product";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

export const useProduct = () => {
  const handleSubmitProduct = async (
    productLike: Partial<Product>
  ): Promise<void> => {
    console.log({ productLike });
  };
  const idSlug = useParams().idSlug || "id";
  const query = useQuery({
    queryKey: ["product", { idSlug }],
    queryFn: () => getProductAction({ idSlug }),
    staleTime: 5 * 1000 * 60, // 5 minutes
    retry: false,
  });

  return { ...query, handleSubmitProduct };
};
