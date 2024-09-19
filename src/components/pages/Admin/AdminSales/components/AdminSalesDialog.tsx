import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useCreateSaleMutation,
  useUpodateSaleMutation,
} from "@/services/hooks/sales/useSalesMutation";
import { useGetAccountsQuery } from "@/services/hooks/accounts/useAccountsQuery";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { useGetServicesQuery } from "@/services/hooks/services/useServicesQuery";
import { es } from "date-fns/locale";
import dayjs from "dayjs";


function AdminSalesDialog({ open, onClose, editSale, currentPage }) {
  const queryClient = useQueryClient();
  const createSale = useCreateSaleMutation();
  const updateSale = useUpodateSaleMutation();
  const { data: accounts } = useGetAccountsQuery();
  const { data: services } = useGetServicesQuery();

  const [service, setService] = useState("");
  const [accountValue, setAccountValue] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (editSale) {
      setAccountValue(editSale.account?._id);
      setAmount(editSale.amount);
      setDate(dayjs(editSale.date).toDate());
      setService(editSale?.service?._id);
    } else {
      setAccountValue("");
      setAmount("");
      setService("");
    }
  }, [editSale]);

  const onSubmit = useCallback(() => {
    if (editSale) {
      updateSale.mutate(
        {
          id: editSale._id,
          bulk: {
            account: accountValue,
            amount: Number(amount),
            service,
            date,
          },
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["getSalesWithPag", currentPage, 10],
            });
            toast.success("Venta actualizada");
            onClose();
          },
          onError: () => {
            toast.error("Error al actualizar la venta, intenta de nuevo");
          }
        }
      );
    } else {
      createSale.mutate(
        {
          account: accountValue,
          amount: Number(amount),
          service,
          date,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["getSalesWithPag", currentPage, 10],
            });
            toast.success("Venta creada");
            onClose();
          },
          onError: () => {
            toast.error("Error al crear la venta, intenta de nuevo");
          }
        }
      );
      onClose();
    }
  }, [editSale, accountValue, date, amount, service, queryClient, onClose, createSale, updateSale, currentPage]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>{editSale ? "Editar venta" : "Crear venta"}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form className="flex flex-col space-y-4">
          <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            locale={es}
          />

          </div>
          <div>
            <Label>Importe</Label>
            <Input
              placeholder="Importe"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div>
            <Label>Servicio</Label>
            <Select value={service} onValueChange={(e) => setService(e)} name="name">
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un servicio" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {services?.map((service) => (
                    <SelectItem value={service._id} key={service._id}>
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Cuenta</Label>
            <Select
              value={accountValue}
              onValueChange={(e) => setAccountValue(e)}
              name="name"
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una cuenta" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {accounts?.length ? accounts?.map((account) => (
                    <SelectItem value={account._id!} key={account._id}>{account.name}</SelectItem>
                  )): null
                
                }
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </form>
        <DialogFooter className="mt-10">
          <Button  className="w-32" onClick={onSubmit}>
            {editSale ? "Guardar" : "Crear"}
          </Button>
          <Button variant="outline" onClick={onClose} className="w-32">
            Cancelar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AdminSalesDialog;
