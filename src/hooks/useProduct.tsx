import { createUpdateProductAction } from "@/actions/create-update-product.actions";
import { getProductAction } from "@/actions/get-product.actions";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

export const useProduct = () => {
  const idSlug = useParams().idSlug || "id";
  const query = useQuery({
    queryKey: ["product", { idSlug }],
    queryFn: () => getProductAction({ idSlug }),
    staleTime: 5 * 1000 * 60, // 5 minutes
    retry: false,
  });

  const mutation = useMutation({
    mutationFn: createUpdateProductAction,
    onSuccess: (productReceived) => {
      console.log("everything ok", productReceived);
      //TODO
      //Cache invalidation
      // QueryData update.
    },
  });

  return { ...query, mutation };
};
