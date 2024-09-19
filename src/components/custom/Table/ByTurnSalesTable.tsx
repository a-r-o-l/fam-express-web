import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DollarSign } from "lucide-react";

type SaleByTurnType = {
  _id: string;
  account: string;
  amount: number;
}

function AllSalesTable({ sales, total }) {
  return (
    <Table>
      <TableHeader className="bg-black">
        <TableRow>
          <TableHead className="text-white">Turno</TableHead>
          <TableHead className="text-white">Monto</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sales?.map(
          (
            sale: SaleByTurnType
          ) => (
            <TableRow key={sale._id}>
              <TableCell>{sale?.account}</TableCell>
              <TableCell className="text-right">
                <span className="flex items-center justify-start">
                  <DollarSign className="mr-1 h-4 w-4 text-green-500" />
                  {sale?.amount?.toFixed(2)}
                </span>
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell className="">
            <span className="flex items-center justify-start font-bold">
              <DollarSign className="mr-1 h-4 w-4 text-green-500" />
              {total}
            </span>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

export default AllSalesTable;
