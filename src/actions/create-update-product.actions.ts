import { teslaApi } from "@/api/TesloApi";
import type { Product } from "@/interfaces/Product";

export const createUpdateProductAction = async (
  productLike: Partial<Product>
): Promise<Product> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, user, images = [], ...restProps } = productLike;

  const isCreating = id === "new";

  restProps.price = Number(restProps.price || 0);
  restProps.stock = Number(restProps.stock || 0);

  const { data } = await teslaApi<Product>({
    method: isCreating ? "POST" : "PATCH",
    url: isCreating ? "/products" : `/products/${id}`,
    data: { ...restProps },
  });

  return {
    ...data,
    images: images.map((image) => {
      if (image.includes("http")) return image;
      return `${import.meta.env.VITE_API_URL}/files/product/${image}`;
    }),
  };
};
