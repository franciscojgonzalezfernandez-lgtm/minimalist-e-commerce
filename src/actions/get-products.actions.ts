import { teslaApi } from "@/api/TesloApi";
import type { ProductsResponse } from "@/interfaces/Products.response";

export const getProductsAction = async () => {
  const { data } = await teslaApi.get<ProductsResponse>("/products");
  console.log(data);
  return data;
};
