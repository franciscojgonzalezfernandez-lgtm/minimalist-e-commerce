import { CustomPagination } from "@/components/CustomPagination";
import { CustomFooter } from "@/shop/components/CustomFooter";
import { CustomJumboTron } from "@/shop/components/CustomJumboTron";
import { ProductsGrid } from "@/shop/components/ProductsGrid";
import { products } from "@/data/products";
import { useProducts } from "@/hooks/useProducts";

export const HomePage = () => {
  const { data } = useProducts();
  console.log("dataa");
  console.log({ data });
  const itemsPerPage = 6;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  return (
    <>
      <CustomJumboTron
        title="All products"
        subtitle="Minimalist and elegant clothes inspired in the futuristic design of Tesla. Premium quality for an atemporal style"
        buttonText="See all the products"
        buttonTarget="productGrid"
      />
      <ProductsGrid products={products} id="productGrid" />
      <CustomPagination totalPages={totalPages} />
      <CustomFooter />
    </>
  );
};
