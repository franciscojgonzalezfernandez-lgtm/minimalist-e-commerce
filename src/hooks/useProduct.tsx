import { createUpdateProductAction } from "@/actions/create-update-product.actions";
import { getProductAction } from "@/actions/get-product.actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";

export const useProduct = () => {
  const queryClient = useQueryClient();
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
      //cache invalidation
      queryClient.invalidateQueries({ queryKey: ["products"] });
      // QueryData update.
      queryClient.setQueryData(["product", { idSlug }], productReceived);
    },
  });

  return { ...query, mutation };
};
