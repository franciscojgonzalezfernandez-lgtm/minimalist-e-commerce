import { CustomPagination } from "@/components/CustomPagination";
import { CustomFooter } from "@/shop/components/CustomFooter";
import { CustomJumboTron } from "@/shop/components/CustomJumboTron";
import { ProductsGrid } from "@/shop/components/ProductsGrid";
import { useProducts } from "@/hooks/useProducts";

export const HomePage = () => {
  const { data } = useProducts();
  return (
    <>
      <CustomJumboTron
        title="All products"
        subtitle="Minimalist and elegant clothes inspired in the futuristic design of Tesla. Premium quality for an atemporal style"
        buttonText="See all the products"
        buttonTarget="productGrid"
      />
      <ProductsGrid
        products={data?.products || []}
        id="productGrid"
        count={data?.count || 0}
      />
      <CustomPagination totalPages={data?.pages || 0} />
      <CustomFooter />
    </>
  );
};
