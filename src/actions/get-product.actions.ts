import { teslaApi } from "@/api/TesloApi";
import type { Product } from "@/interfaces/Product";
import { ROUTE_TO_IMAGES } from "./get-products.actions";

const DUMMY_PRODUCT: Product = {
  id: "",
  title: "",
  price: 0,
  description: "",
  slug: "",
  stock: 0,
  sizes: [],
  gender: undefined,
  tags: [],
  images: [],
};

interface Props {
  idSlug: string;
}

export const getProductAction = async ({ idSlug }: Props): Promise<Product> => {
  if (idSlug === "new") return DUMMY_PRODUCT;
  const { data } = await teslaApi.get<Product>(`/products/${idSlug}`);

  // image mapping
  const newImages = data.images.map((image) => {
    if (image.includes("http")) return image;
    return `${import.meta.env.VITE_API_URL}${ROUTE_TO_IMAGES}${image}`;
  });

  return { ...data, images: newImages };
};
