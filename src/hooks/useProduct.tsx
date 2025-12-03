import { getProductAction } from "@/actions/get-product.actions";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

export const useProduct = () => {
  const idSlug = useParams().idSlug || "id";
  return useQuery({
    queryKey: ["product", { idSlug }],
    queryFn: () => getProductAction({ idSlug }),
    staleTime: 5 * 1000 * 60, // 5 minutes
    retry: false,
  });
};
