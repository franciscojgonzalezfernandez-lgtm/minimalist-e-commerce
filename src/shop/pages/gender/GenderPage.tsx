import { CustomPagination } from "@/components/CustomPagination";
import { products } from "@/data/products";
import { CustomFooter } from "@/shop/components/CustomFooter";
import { CustomJumboTron } from "@/shop/components/CustomJumboTron";
import { ProductsGrid } from "@/shop/components/ProductsGrid";
import { useParams } from "react-router";

export const GenderPage = () => {
  const itemsPerPage = 6;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const { gender } = useParams();

  return (
    <>
      <CustomJumboTron
        title={`The best products for ${gender}`}
        subtitle="Minimalist and elegant clothes inspired in the futuristic design of Tesla. Premium quality for an atemporal style"
        buttonText="See all the products"
      />
      <ProductsGrid products={products} />
      <CustomPagination totalPages={totalPages} />
      <CustomFooter />
    </>
  );
};
