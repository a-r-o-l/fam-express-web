import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useState } from "react";
import { useGetServicesQuery } from "@/services/hooks/services/useServicesQuery";
import { useQueryClient } from "@tanstack/react-query";
import { RenderIcon } from "@/utils/RenderIcon";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { EllipsisVertical, Trash } from "lucide-react";
import { useGetChargesQuery } from "@/services/hooks/charges/useChargesQuery";
import { useCreateChargeMutation } from "@/services/hooks/charges/useChargesMutation";
import { PartialChargeIntWithPopulation } from "@/types/ChargeTypes";
import dayjs from "dayjs";
import { toast } from "sonner";

function AdminRechargePage() {
  const queryClient = useQueryClient();
  const { data: services } = useGetServicesQuery();
  const { data: charges } = useGetChargesQuery();
  const createCharge = useCreateChargeMutation();
  const [selectedService, setSelectedService] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3">
        {services?.length ? (
          services?.map((ser) => {
            return (
              <Card key={ser._id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {(ser.name ?? "").toUpperCase()}
                  </CardTitle>
                  <RenderIcon name={ser.name} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$ {ser.amount}</div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <></>
        )}
      </div>
      <Card className="w-full max-w-full md:w-full lg:w-full">
        <CardHeader>
          <CardTitle>Recarga</CardTitle>
          <CardDescription>Recarga tu saldo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-5">
            <div>
              <Label>Empresa</Label>
              <Select
                onValueChange={(e) => setSelectedService(e)}
                value={selectedService}
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder="Selecciona una empresa"
                    defaultValue="sirve"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {services?.length ? (
                      services?.map((service) => (
                        <SelectItem
                          key={service._id}
                          value={service._id}
                          className="flex flex-row"
                        >
                          {service.name}
                        </SelectItem>
                      ))
                    ) : (
                      <></>
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Monto</Label>
              <Input
                placeholder="Ingresa el monto a cargar"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex justify-end gap-10 w-full mt-10">
            <Button variant="outline">Limpiar</Button>
            <Button
              variant="default"
              onClick={() => {
                createCharge.mutate(
                  {
                    service: selectedService,
                    amount: amount ? parseInt(amount) : 0,
                    date: dayjs().toDate(),
                  },
                  {
                    onSuccess: () => {
                      setAmount("");
                      queryClient.invalidateQueries({
                        queryKey: ["getServices"],
                      });
                      queryClient.invalidateQueries({
                        queryKey: ["getCharges"],
                      });
                      toast.success("Recarga exitosa");
                    },
                    onError: (err) => {
                      console.log(err);
                    },
                  }
                );
              }}
            >
              Enviar
            </Button>
          </div>
        </CardFooter>
      </Card>

      <Card className="w-full mx-auto mt-10">
        <CardHeader className="">
          <CardTitle className="font-semibold text-xl">Cargas</CardTitle>
          <CardDescription>Todas las cargas</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="relative w-full overflow-y-auto border rounded-md">
            <Table>
              <TableHeader className="bg-black">
                <TableRow>
                  <TableHead className="text-white">Id</TableHead>
                  <TableHead className="text-white">Servicio</TableHead>
                  <TableHead className="text-white">Monto</TableHead>
                  <TableHead className="text-white">Fecha</TableHead>
                  <TableHead className="text-white">Creacion</TableHead>
                  <TableHead className="text-white">Actualizacion</TableHead>
                  <TableHead className="text-white text-right">
                    Acciones
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {charges?.length ? (
                  charges?.map((charge: PartialChargeIntWithPopulation) => (
                    <TableRow key={charge?._id}>
                      <TableCell>{charge?._id}</TableCell>
                      <TableCell>{charge?.service?.name}</TableCell>
                      <TableCell>$ {charge?.amount}</TableCell>
                      <TableCell>
                        {charge?.date
                          ? dayjs(charge?.date).format("DD/MM/YY HH:mm")
                          : ""}
                      </TableCell>
                      <TableCell>
                        {charge?.createdAt
                          ? dayjs(charge?.createdAt).format("DD/MM/YY")
                          : ""}
                      </TableCell>
                      <TableCell>
                        {charge?.updatedAt
                          ? dayjs(charge?.updatedAt).format("DD/MM/YY")
                          : ""}
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
                            <DropdownMenuLabel></DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => {}}>
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
                    <TableCell colSpan={7} className="text-center h-20">
                      No hay cargas
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
    </div>
  );
}

export default AdminRechargePage;
