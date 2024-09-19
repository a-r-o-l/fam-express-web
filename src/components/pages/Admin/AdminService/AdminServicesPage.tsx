import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useCreateServiceMutation,
  useDeleteServiceMutation,
} from "@/services/hooks/services/useServicesMutation";
import { useGetServicesQuery } from "@/services/hooks/services/useServicesQuery";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { EllipsisVertical, Pencil, Trash } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import AdminServicesDialog  from "./components/AdminServicesDialog";
import { PartialServiceInt } from "@/types/ServiceTypes";

function AdminChargesPage() {
  const { data: services } = useGetServicesQuery();
  const queryClient = useQueryClient();
  const createService = useCreateServiceMutation();
  const deleteService = useDeleteServiceMutation();
  const [selectedService, setSelectedService] = useState< PartialServiceInt |null>(null);
  const [name, setName] = useState("");
  const [profit, setProfit] = useState("");

  return (
    <div className="container mx-auto px-6 py-8">
      <Card className="w-full max-w-full md:w-full lg:w-full">
        <CardHeader>
          <CardTitle>Crear Servicio</CardTitle>
          <CardDescription>Crea un nuevo servicio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-5">
            <div>
              <Label>Servicio</Label>
              <Input
                placeholder="Ingresa el nombre del servicio"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <Label>Porcentaje</Label>
              <Input
                placeholder="Ingresa el monto de ganancia"
                value={profit}
                onChange={(e) => setProfit(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex justify-end gap-10 w-full mt-10">
            <Button
              variant="default"
              onClick={() => {
                createService.mutate(
                  {
                    name,
                    profit: profit ? Number(profit) : 0,
                  },
                  {
                    onSuccess: () => {
                      setName("");
                      setProfit("");
                      queryClient.invalidateQueries({
                        queryKey: ["getServices"],
                      });
                      toast.success("Servicio creado exitosamente");
                    },
                    onError: (err) => {
                      console.log(err);
                      toast.error(
                        "Error al crear el servicio, por favor intenta de nuevo"
                      );
                    },
                  }
                );
              }}
            >
              Crear
            </Button>
          </div>
        </CardFooter>
      </Card>
      <Card className="w-full mx-auto mt-10">
        <CardHeader className="">
          <CardTitle className="font-semibold text-xl">Servicios</CardTitle>
          <CardDescription>Todos tus servicios</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="relative w-full overflow-y-auto border rounded-md">
            <Table>
              <TableHeader className="bg-black">
                <TableRow>
                  <TableHead className="text-white">Id</TableHead>
                  <TableHead className="text-white">Servicio</TableHead>
                  <TableHead className="text-white">Monto</TableHead>
                  <TableHead className="text-white">Ganancia</TableHead>
                  <TableHead className="text-white">Creacion</TableHead>
                  <TableHead className="text-white">Actualizacion</TableHead>
                  <TableHead className="text-white text-right">
                    Acciones
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services?.length ? (
                  services?.map((service) => (
                    <TableRow key={service?._id}>
                      <TableCell>{service?._id}</TableCell>
                      <TableCell>{service?.name}</TableCell>
                      <TableCell>$ {service?.amount}</TableCell>
                      <TableCell>$ {service?.profit}</TableCell>
                      <TableCell>
                        {dayjs(service?.createdAt).format("DD/MM/YY")}
                      </TableCell>
                      <TableCell>
                        {dayjs(service?.updatedAt).format("DD/MM/YY")}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="rounded-full"
                            >
                              <EllipsisVertical className="cursor-pointer h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>
                              {service.name}
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />

                            <DropdownMenuItem onClick={()=> setSelectedService(service)}>
                              <Pencil className="mr-2 h-4 w-4" />
                              <span>Editar</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                deleteService.mutate(
                                  { id: service._id },
                                  {
                                    onSuccess: () => {
                                      queryClient.invalidateQueries({
                                        queryKey: ["getServices"],
                                      });
                                      toast.success("Servicio eliminado");
                                    },
                                    onError: (err) => {
                                      toast.error(
                                        "Error al eliminar el servicio, por favor intenta de nuevo"
                                      );
                                      console.log(err);
                                    },
                                  }
                                );
                              }}
                              className="text-red-500"
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              <span>Eliminar</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center h-20">
                      No hay servicios
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
              <TableFooter></TableFooter>
            </Table>
          </div>
          <Pagination className="pt-5">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  // onClick={() => handlePageChange(currentPage - 1)}
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
                  // onClick={() => handlePageChange(currentPage + 1)}
                  className="cursor-pointer"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardContent>
      </Card>
      <AdminServicesDialog open={!!selectedService} onClose={()=>setSelectedService(null)} editService={selectedService} />
    </div>
  );
}

export default AdminChargesPage;
