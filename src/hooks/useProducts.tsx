import { getProductsAction } from "@/actions/get-products.actions";
import { useQuery } from "@tanstack/react-query";

export const useProducts = () => {
  // TODO Meter próximos parámetros
  return useQuery({
    queryKey: ["products"],
    queryFn: getProductsAction,
  });
};
