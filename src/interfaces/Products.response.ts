import type { Product } from "./Product";

export interface ProductsResponse {
  count: number;
  pages: number;
  products: Product[];
}
