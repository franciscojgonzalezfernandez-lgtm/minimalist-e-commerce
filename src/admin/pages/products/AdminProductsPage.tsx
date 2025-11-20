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
import { PlusIcon } from "lucide-react";
import { Link } from "react-router";

export const AdminProductsPage = () => {
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
          <TableRow>
            <TableCell className="font-medium">Producto 1</TableCell>
            <TableCell>
              <img
                className="rounded-md w-20 h-20 object-cover"
                src="https://placehold.co/100x100"
              />
            </TableCell>
            <TableCell>250.00 CHF</TableCell>
            <TableCell>Categoría 1</TableCell>
            <TableCell>100 Stock</TableCell>
            <TableCell>XS, S, L</TableCell>
            <TableCell className="text-right">
              <Link to="tesla-shirt">Editar</Link>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <CustomPagination totalPages={4} />
    </>
  );
};
