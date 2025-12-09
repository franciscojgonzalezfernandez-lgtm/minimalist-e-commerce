import { createUpdateProductAction } from "@/actions/create-update-product.actions";
import { deleteProductAction } from "@/actions/delete-product.actions";
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
      //cache invalidation
      queryClient.invalidateQueries({ queryKey: ["products"] });
      // QueryData update.
      queryClient.setQueryData(
        ["product", { idSlug: productReceived.slug }],
        productReceived
      );
      queryClient.setQueryData(
        ["product", { id: productReceived.id }],
        productReceived
      );
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: deleteProductAction,
    onSuccess: (data) => {
      if (data) {
        //cache invalidation
        queryClient.invalidateQueries({ queryKey: ["products"] });
      }
    },
  });

  return { ...query, mutation, deleteProductMutation };
};
