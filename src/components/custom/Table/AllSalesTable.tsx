import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PartialAccountInt } from "@/types/AccountTypes";
import { PartialSaleInt } from "@/types/SaleTypes";
import { PartialServiceInt } from "@/types/ServiceTypes";
import dayjs from "dayjs";
import { DollarSign } from "lucide-react";

function AllSalesTable({ sales, total }) {
  return (
    <Table>
      <TableHeader className="bg-black">
        <TableRow>
          <TableHead className="text-white">Servicio</TableHead>
          <TableHead className="text-white">Turno</TableHead>
          <TableHead className="text-white">Hora</TableHead>
          <TableHead className="text-white">Monto</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sales?.map(
          (
            sale: PartialSaleInt & {
              service: PartialServiceInt;
              account: PartialAccountInt;
            }
          ) => (
            <TableRow key={sale._id}>
              <TableCell>{sale?.service?.name}</TableCell>
              <TableCell>{sale?.account?.name}</TableCell>
              <TableCell>{dayjs(sale?.date).format("hh:mm")}</TableCell>
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
          <TableCell colSpan={3}>Total Sales</TableCell>
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
