import CustomAlertDialog from "@/components/custom/Alert/CustomAlertDialog";
import CashClosingDetailsModal from "@/components/custom/Modal/CashClosingDetailsModal";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetCashesClosingQuery } from "@/services/hooks/cashClosing/useCashClosingQuery";
import dayjs from "dayjs";
import { EllipsisVertical, Pencil, ReceiptText, TrashIcon } from "lucide-react";
import { useState } from "react";
import { useDeleteClashClosingMutation } from "@/services/hooks/cashClosing/useCashClosingMutation";
import { PartialCashClosingIntWithPopulate } from "@/types/CashClosingTypes";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

function AdminCashClosingPage() {
  const queryClient = useQueryClient();
  const [selectedCashClosing, setSelectedCashClosing] =
    useState<PartialCashClosingIntWithPopulate | null>(null);
  const [selectedCashClosingToDelete, setSelectedCashClosingToDelete] =
    useState<PartialCashClosingIntWithPopulate | null>(null);
  const { data: cashesClosing } = useGetCashesClosingQuery();
  const deleteCashClosing = useDeleteClashClosingMutation();

  return (
    <div className="container mx-auto px-6 py-8">
      <Card className="w-full max-w-7xl mx-auto">
        <CardHeader>
          <CardTitle className="font-semibold text-xl">Cierres</CardTitle>
          <CardDescription>Todos los cierres</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="relative h-[400px] w-full overflow-y-auto border rounded-md">
            <Table>
              <TableHeader className="bg-black sticky top-0 z-10">
                <TableRow>
                  <TableHead className="text-white">Id</TableHead>
                  <TableHead className="text-white text-left">Ventas</TableHead>
                  <TableHead className="text-white text-left">
                    Ganancias
                  </TableHead>
                  <TableHead className="text-white text-left">Total</TableHead>
                  <TableHead className="text-white text-left">Cambio</TableHead>
                  <TableHead className="text-white text-left">
                    Balance
                  </TableHead>
                  <TableHead className="text-white text-left">Cuenta</TableHead>
                  <TableHead className="text-white text-left">Fecha</TableHead>
                  <TableHead className="text-left"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cashesClosing?.length ? (
                  cashesClosing?.map(
                    (item: PartialCashClosingIntWithPopulate) => (
                      <TableRow key={item._id}>
                        <TableCell className="text-left">{item._id}</TableCell>
                        <TableCell className="text-left">
                          {item.sale_amount}
                        </TableCell>
                        <TableCell className="text-left">
                          {item?.Profit || "-"}
                        </TableCell>
                        <TableCell className="text-left">
                          {item.total}
                        </TableCell>
                        <TableCell className="text-left">
                          {item.change}
                        </TableCell>
                        <TableCell className="text-left">
                          {item.balance}
                        </TableCell>
                        <TableCell className="text-left">
                          {item?.account?.name}
                        </TableCell>
                        <TableCell className="text-left">
                          {dayjs(item?.date).format("DD/MM/YY")}
                        </TableCell>
                        <TableCell className="text-left">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <EllipsisVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedCashClosing(item);
                                }}
                              >
                                <ReceiptText className="mr-2 h-4 w-4" />
                                Detalles
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedCashClosingToDelete(item);
                                }}
                              >
                                <TrashIcon className="mr-2 h-4 w-4" />
                                Eliminar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    )
                  )
                ) : (
                  <TableRow>
                    <TableCell className="text-center h-20" colSpan={5}>
                      No hay cierres
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <Pagination className="pt-5">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  //   onClick={() => handlePageChange(currentPage - 1)}
                  className="cursor-pointer"
                />
              </PaginationItem>
              {Array.from({ length: 3 }, (_, i) => (
                <PaginationItem key={i} className="cursor-pointer">
                  <PaginationLink
                  // onClick={() => handlePageChange(i + 1)}
                  // isActive={currentPage === i + 1}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  //   onClick={() => handlePageChange(currentPage + 1)}
                  className="cursor-pointer"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardContent>
      </Card>
      <CashClosingDetailsModal
        open={!!selectedCashClosing}
        onClose={() => setSelectedCashClosing(null)}
        cashClosing={selectedCashClosing}
      />
      <CustomAlertDialog
        title="Estas seguro de eliminar este cierre?"
        description="Esta acción no se puede deshacer."
        open={!!selectedCashClosingToDelete}
        onAccept={() => {
          if (!selectedCashClosingToDelete?._id || !selectedCashClosingToDelete)
            return;
          deleteCashClosing.mutate(
            { id: selectedCashClosingToDelete?._id },
            {
              onSuccess: () => {
                setSelectedCashClosingToDelete(null);
                toast.success("Cierre eliminado correctamente");
                queryClient.invalidateQueries({
                  queryKey: ["getCashesClosing"],
                });
              },
              onError: () => {
                toast.error("Error al eliminar el cierre, intenta de nuevo");
              },
            }
          );
        }}
        onClose={() => {
          setSelectedCashClosingToDelete(null);
        }}
      />
    </div>
  );
}

export default AdminCashClosingPage;
