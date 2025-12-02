import { AdminTitle } from "@/admin/components/AdminTitle";
import { CustomPagination } from "@/components/CustomPagination";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useProducts } from "@/hooks/useProducts";
import { PlusIcon } from "lucide-react";
import { Link } from "react-router";

export const AdminProductsPage = () => {
  const { data } = useProducts();
  return (
    <>
      <div className="flex justify-between items-center">
        <AdminTitle greet="Products" subtitle="Manage your products here" />
        <div className="flex justify-end mb-10 gap-4">
          <Link to="new">
            <Button>
              <PlusIcon />
              New Product
            </Button>
          </Link>
        </div>
      </div>
      {data && data.products && (
        <>
          <Table className="bg-white p-10 mb-10 shadow-xs border border-gray-200">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Inventary</TableHead>
                <TableHead>Sizes</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.products.map((product) => {
                return (
                  <TableRow
                    key={product.id}
                    className={
                      product.stock == 0
                        ? "bg-red-100"
                        : product.stock < 5
                        ? "bg-yellow-100"
                        : ""
                    }
                  >
                    <TableCell className="font-medium">
                      {product.title}
                    </TableCell>
                    <TableCell>
                      <img
                        className="rounded-md w-20 h-20 object-cover"
                        src={product.images[0]}
                      />
                    </TableCell>
                    <TableCell>{product.price} CHF</TableCell>
                    <TableCell>{product.gender}</TableCell>
                    <TableCell>{product.stock} Stock</TableCell>
                    <TableCell>{product.sizes.join(", ")}</TableCell>
                    <TableCell className="text-right">
                      <Link to="tesla-shirt">Edit</Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          <CustomPagination totalPages={data.pages} />
        </>
      )}
    </>
  );
};
