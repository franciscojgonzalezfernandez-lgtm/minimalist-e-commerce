import { CustomPagination } from "@/components/CustomPagination";
import { CustomFooter } from "@/shop/components/CustomFooter";
import { CustomJumboTron } from "@/shop/components/CustomJumboTron";
import { ProductsGrid } from "@/shop/components/ProductsGrid";
import { products } from "@/data/products";

export const HomePage = () => {
  const itemsPerPage = 6;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  return (
    <>
      <CustomJumboTron
        title="All products"
        subtitle="Minimalist and elegant clothes inspired in the futuristic design of Tesla. Premium quality for an atemporal style"
        buttonText="See all the products"
        buttonTarget="aqui"
      />

      <div className="h-30" id="aqui">
        Aquí
      </div>
      <ProductsGrid products={products} />
      <CustomPagination totalPages={totalPages} />
      <CustomFooter />
    </>
  );
};
