import { teslaApi } from "@/api/TesloApi";
import type { Product } from "@/interfaces/Product";
import { ROUTE_TO_IMAGES } from "./get-products.actions";

interface Props {
  idSlug: string;
}

export const getProductAction = async ({ idSlug }: Props): Promise<Product> => {
  const { data } = await teslaApi.get<Product>(`/products/${idSlug}`);

  // image mapping
  const newImages = data.images.map(
    (image) => `${import.meta.env.VITE_API_URL}${ROUTE_TO_IMAGES}${image}`
  );

  return { ...data, images: newImages };
};
