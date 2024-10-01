import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdatePaymentSessionMutation } from "@/services/hooks/paymentSession/usePaymentSessionMutation";
import { usePaymentSessionStore } from "@/store/usePaymentSessionStore";
import { useQueryClient } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function AddCashModal({ openDialog, onClose, type }) {
  const [value, setValue] = useState("");
  const updatePaymentSession = useUpdatePaymentSessionMutation();
  const { paymentsession } = usePaymentSessionStore();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!openDialog) {
      setValue("");
    }
  }, [openDialog]);

  return (
    <Dialog open={openDialog} onOpenChange={onClose}>
      <DialogContent>
        <div className="dialog-header">
          <DialogTitle>Aumentar dinero</DialogTitle>
          <DialogDescription>
            Tipo
            {type === "cash" ? " efectivo" : " transferencia"}
          </DialogDescription>
        </div>
        <div className="flex flex-col gap-5 items-start">
          <div className="w-full">
            <Label>Importe</Label>
            <Input
              placeholder="Ingresa el importe del aumento"
              value={value}
              type="number"
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <div className="flex flex-col justify-center gap-5 w-full mt-10">
            <Button
              onClick={() => {
                let bulk = {};
                if (type === "cash") {
                  bulk = { cash: Number(value) + (paymentsession?.cash || 0) };
                } else {
                  bulk = {
                    transfer: Number(value) + (paymentsession?.transfer || 0),
                  };
                }
                bulk = {
                  ...bulk,
                  total: (paymentsession?.total || 0) + Number(value),
                };
                updatePaymentSession.mutate(
                  { id: paymentsession?._id || "", bulk },
                  {
                    onSuccess: () => {
                      toast.success("Dinero agregado correctamente");
                      queryClient.invalidateQueries({
                        queryKey: ["getActivePaymentSession"],
                      });
                      onClose();
                    },
                    onError: () => {
                      toast.error("Error al agregar el dinero");
                    },
                  }
                );
              }}
            >
              {updatePaymentSession.isPending ? (
                <LoaderCircle className="h-6 w-6 animate-spin" />
              ) : (
                "Agregar"
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddCashModal;
