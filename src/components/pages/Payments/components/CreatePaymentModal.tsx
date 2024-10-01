import { Avatar, AvatarImage } from "@/components/ui/avatar";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { uploadImage } from "@/lib/uploadImage";
import { useCreatePaymentMutation } from "@/services/hooks/payment/usePaymentsMutation";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Camera, LoaderCircle, ReceiptText } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

function CreatePaymentModal({
  openDialog,
  onClose,
  accessToken,
  paymentsession,
}) {
  const imageInputRef = React.useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("cash");
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const createPayment = useCreatePaymentMutation();

  useEffect(() => {
    if (!openDialog) {
      setFile(null);
      setValue("");
      setDescription("");
    }
  }, [openDialog]);

  return (
    <Dialog open={openDialog} onOpenChange={onClose}>
      <DialogContent>
        <div className="dialog-header">
          <DialogTitle>Nuevo Pago</DialogTitle>
          <DialogDescription>Crear un nuevo pago</DialogDescription>
        </div>
        <div className="flex flex-col gap-5 items-start">
          <div className="relative">
            <Label>Recibo</Label>
            <Avatar className="h-28 w-28 rounded-md border-4 justify-center items-center">
              {file ? (
                <AvatarImage
                  src={file ? URL.createObjectURL(file) : "./placeholder.png"}
                />
              ) : (
                <ReceiptText className="h-12 w-12 text-muted-foreground" />
              )}
            </Avatar>
            <Button
              className="absolute top-28 right-[5px] text-muted-foreground rounded-full w-8 h-8 bg-black text-white"
              size="icon"
              variant="outline"
              onClick={() => imageInputRef.current?.click()}
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>

          <div className="w-full">
            <Label>Tipo</Label>
            <Select value={type} onValueChange={(e) => setType(e)} name="name">
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un usuario" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="cash">Efectivo</SelectItem>
                  <SelectItem value="transfer">Transferencia</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <input
            className="hidden"
            placeholder="asdasd"
            ref={imageInputRef}
            type="file"
            onChange={(e) => {
              if (e.target.files) {
                setFile(e.target.files[0]);
              }
            }}
          />
          <div className="w-full">
            <Label>Importe</Label>
            <Input
              placeholder="Ingresa el importe del pago"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <div className="w-full">
            <Label>Descripcion</Label>
            <Textarea
              placeholder="Agregar una descripcion sobre el pago"
              value={description}
              rows={5}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <div className="flex flex-col justify-center gap-5 w-full mt-10">
            <Button
              disabled={
                isLoading || createPayment.isPending || !value || !description
              }
              onClick={async () => {
                setIsLoading(true);
                if (!paymentsession) {
                  toast.error("No hay una sesion de pago activa");
                  return;
                }
                let imageUrl;
                if (file) {
                  imageUrl = await uploadImage(file, accessToken);
                }
                createPayment.mutate(
                  {
                    date: dayjs().toDate(),
                    amount: Number(value),
                    description: description,
                    type: type,
                    payment_session: paymentsession._id,
                    receipt: imageUrl?.data ? imageUrl?.data?.url : undefined,
                  },
                  {
                    onSuccess: () => {
                      toast.success("Pago creado correctamente");
                      queryClient.invalidateQueries({
                        queryKey: ["getPayments", paymentsession._id],
                      });
                      queryClient.invalidateQueries({
                        queryKey: ["getActivePaymentSession"],
                      });
                      onClose();
                      setValue("");
                      setDescription("");
                      setIsLoading(false);
                    },
                    onError: () => {
                      toast.error("Error al crear el pago");
                      setIsLoading(false);
                    },
                  }
                );

                onClose();
              }}
            >
              {isLoading || createPayment.isPending ? (
                <LoaderCircle className="h-6 w-6 animate-spin" />
              ) : (
                "Crear"
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreatePaymentModal;
