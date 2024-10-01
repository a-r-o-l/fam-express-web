import CustomAlertDialog from "@/components/custom/Alert/CustomAlertDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useGetSalesWithPaginationQuery } from "@/services/hooks/sales/useSalesQuery";
import { PartialSaleIntPopulated } from "@/types/SaleTypes";
import dayjs from "dayjs";
import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useDeleteSaleMutation } from "@/services/hooks/sales/useSalesMutation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import AdminSalesDialog from "./components/AdminSalesDialog";
import { Label } from "@radix-ui/react-dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetServicesQuery } from "@/services/hooks/services/useServicesQuery";
import { useGetAccountsQuery } from "@/services/hooks/accounts/useAccountsQuery";

function AdminSalesPage() {
  const [selectedSale, setSelectedSale] =
    useState<PartialSaleIntPopulated | null>(null);
  const [selectedSaleToEdit, setSelectedSaleToEdit] =
    useState<PartialSaleIntPopulated | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const deleteSale = useDeleteSaleMutation();
  const queryClient = useQueryClient();

  const [currentPage, setCurrentPage] = useState(1);

  const [serviceParam, setServiceParam] = useState("all");
  const [accountsParam, setAccountsParam] = useState("all");

  const { data: sales } = useGetSalesWithPaginationQuery({
    limit: 100,
    page: currentPage,
    account: accountsParam,
    service: serviceParam,
  });

  const { data: services } = useGetServicesQuery();
  const { data: accounts } = useGetAccountsQuery({ role: "cargas virtuales" });
  const [totalPages, setTotalPages] = useState(sales?.totalPages || 1);

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage > 0 && newPage <= totalPages) {
        setCurrentPage(newPage);
      }
    },
    [totalPages]
  );

  useEffect(() => {
    if (sales?.totalPages) {
      setTotalPages(sales.totalPages);
    }
  }, [sales]);

  return (
    <div className="container mx-auto px-6 py-8">
      <Card className="w-full max-w-7xl mx-auto">
        <CardHeader>
          <CardTitle className="w-full items-center justify-between flex">
            <span className="font-semibold text-xl">Ventas</span>
            <div className="flex items-center justify-end w-full">
              <Button onClick={() => setOpenModal(true)}>Crear venta</Button>
            </div>
          </CardTitle>
          <div className="w-full flex justify-start items-center gap-10">
            <div className="w-1/5">
              <Label>Servicio</Label>
              <Select
                value={serviceParam}
                onValueChange={(e) => setServiceParam(e)}
                name="name"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un usuario" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={"all"}>Todos</SelectItem>
                    {services?.map((service) => (
                      <SelectItem value={service._id} key={service._id}>
                        {service.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="w-1/5">
              <Label>Cuenta</Label>
              <Select
                value={accountsParam}
                onValueChange={(e) => setAccountsParam(e)}
                name="name"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un usuario" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={"all"}>Todas</SelectItem>
                    {accounts?.map((acc) => (
                      <SelectItem value={acc._id!} key={acc._id}>
                        {acc.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="relative h-[400px] w-full overflow-y-auto border rounded-md">
            <Table>
              <TableHeader className="bg-black sticky top-0 z-10">
                <TableRow>
                  <TableHead className="text-white">Id</TableHead>
                  <TableHead className="text-white text-left">
                    Importe
                  </TableHead>
                  <TableHead className="text-white text-left">Fecha</TableHead>
                  <TableHead className="text-white text-left">
                    Servicio
                  </TableHead>
                  <TableHead className="text-white text-left">Cuenta</TableHead>
                  <TableHead className="text-left"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sales?.sales?.map((item: PartialSaleIntPopulated) => (
                  <TableRow key={item._id}>
                    <TableCell className="text-left">{item._id}</TableCell>
                    <TableCell className="text-left">{item.amount}</TableCell>
                    <TableCell className="text-left">
                      {dayjs(item?.date).format("DD/MM/YY - HH:mm")}
                    </TableCell>
                    <TableCell className="text-left">
                      {item?.service?.name}
                    </TableCell>
                    <TableCell className="text-left">
                      {item?.account?.name}
                    </TableCell>
                    <TableCell className="text-left">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <EllipsisVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedSaleToEdit(item);
                              setOpenModal(true);
                            }}
                          >
                            <Pencil className="h-4 w-4 mr-2" />
                            Editar
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            className="text-red-500"
                            onClick={() => {
                              setSelectedSale(item);
                            }}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Pagination className="pt-5">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="cursor-pointer"
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i} className="cursor-pointer">
                  <PaginationLink
                    onClick={() => handlePageChange(i + 1)}
                    isActive={currentPage === i + 1}
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
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="cursor-pointer"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardContent>
      </Card>
      <AdminSalesDialog
        currentPage={currentPage}
        open={openModal}
        onClose={() => {
          setSelectedSaleToEdit(null);
          setOpenModal(false);
        }}
        editSale={selectedSaleToEdit}
      />
      <CustomAlertDialog
        title="Estas seguro de eliminar esta venta?"
        description="Esta acción no se puede deshacer."
        open={!!selectedSale}
        onClose={() => setSelectedSale(null)}
        onAccept={() => {
          if (!selectedSale?._id) {
            return;
          }
          deleteSale.mutate(
            { id: selectedSale._id },
            {
              onSuccess: () => {
                queryClient.invalidateQueries({
                  queryKey: ["getSalesWithPag", currentPage, 100],
                });
                setSelectedSale(null);
                toast.success("Venta eliminada correctamente");
              },
              onError: () => {
                toast.error("Error al eliminar la venta, intenta de nuevo");
              },
            }
          );
        }}
        onCancel={() => setSelectedSale(null)}
      />
    </div>
  );
}

export default AdminSalesPage;
