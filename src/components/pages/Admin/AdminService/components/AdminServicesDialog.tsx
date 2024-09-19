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
import { useUpdateServiceMutation } from "@/services/hooks/services/useServicesMutation";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function AdminServicesDialog({ open, onClose, editService }) {
  const queryClient = useQueryClient();
  const updateService = useUpdateServiceMutation();
  const [serviceName, setServiceName] = useState("");
  const [profit, setProfit] = useState("");
  const [amount, setAmount] = useState("");


  useEffect(()=>{
    if(editService){
      setServiceName(editService?.name);
      setProfit(editService?.profit || "");
      setAmount(editService?.amount || "");
    }
  },[editService])

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>
            {editService ? "Editar venta" : "Crear venta"}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form className="flex flex-col space-y-4">
          <div>
            <Label>Servicio</Label>
            <Input
              placeholder="Ingresa el nombre del servicio"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
            />
          </div>
          <div>
            <Label>Porcentaje de ganancia</Label>
            <Input
              placeholder="Ingresa el porcentaje de ganancia"
              value={profit}
              onChange={(e) => setProfit(e.target.value)}
            />
          </div>
          <div>
            <Label>Credito</Label>
            <Input
              placeholder="Ingresa el credito"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </form>
        <DialogFooter className="mt-10">
          <Button
            className="w-32"
            onClick={() => {
              updateService.mutate(
                {
                  id: editService._id,
                  data: {
                    name: serviceName,
                    profit: Number(profit),
                    amount: Number(amount),
                  },
                },
                {
                  onSuccess: () => {
                    queryClient.invalidateQueries({
                      queryKey: ["getServices"],
                    });
                    onClose();
                    toast.success("Servicio actualizado exitosamente.");
                  },
                  onError: () => {
                    toast.error(
                      "Ocurrio un error al actualizar el servicio, intenta de nuevo."
                    );
                  },
                }
              );
            }}
          >
            {editService ? "Guardar" : "Crear"}
          </Button>
          <Button variant="outline" onClick={onClose} className="w-32">
            Cancelar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AdminServicesDialog;
