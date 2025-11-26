import { getProductsAction } from "@/actions/get-products.actions";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router";

export const useProducts = () => {
  const [urlParams, setUrlParams] = useSearchParams();
  const { gender } = useParams();

  const limit = Number(urlParams.get("limit")) || 9;
  const page = urlParams.get("page") || 1;
  const offset = (Number(page) - 1) * Number(limit);
  const sizes = urlParams.get("sizes") || undefined;
  const q = urlParams.get("query") || undefined;
  // Price boilerplate
  const price = urlParams.get("price");
  let minPrice: string | undefined, maxPrice: string | undefined;
  if (price !== "any") {
    if (price == "200+") {
      minPrice = "200";
    } else {
      minPrice = price?.split("-")[0];
      maxPrice = price?.split("-")[1];
    }
  }

  return useQuery({
    queryKey: [
      "products",
      { offset, limit, gender, sizes, minPrice, maxPrice, q },
    ],
    queryFn: () =>
      getProductsAction({
        offset: isNaN(offset) ? 0 : offset,
        limit: isNaN(limit) ? 9 : limit,
        gender,
        sizes,
        minPrice,
        maxPrice,
        q,
      }),
    staleTime: 5 * 1000 * 60, // 5 minutes
  });
};
