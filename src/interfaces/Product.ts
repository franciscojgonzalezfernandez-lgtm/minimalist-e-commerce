import type { Gender } from "./Products.response";
import type { User } from "./User";

export type size = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export type Gender = "kid" | "men" | "women";

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  slug: string;
  stock: number;
  sizes: size[];
  gender: Gender;
  tags: string[];
  images: string[];
  user: User;
}
