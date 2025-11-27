import { CustomPagination } from "@/components/CustomPagination";
import { useProducts } from "@/hooks/useProducts";
import { CustomFooter } from "@/shop/components/CustomFooter";
import { CustomJumboTron } from "@/shop/components/CustomJumboTron";
import { ProductsGrid } from "@/shop/components/ProductsGrid";
import { useParams } from "react-router";

export const GenderPage = () => {
  const { gender } = useParams();
  const { data } = useProducts();

  return (
    <>
      <CustomJumboTron
        title={`The best products for ${gender}`}
        subtitle="Minimalist and elegant clothes inspired in the futuristic design of 2043. Premium quality for an atemporal style"
        buttonText="Go see the products"
        buttonTarget="productsGrid"
      />
      <ProductsGrid
        products={data?.products || []}
        count={data?.count || 0}
        id="productsGrid"
      />
      <CustomPagination totalPages={data?.pages || 1} />
      <CustomFooter />
    </>
  );
};
