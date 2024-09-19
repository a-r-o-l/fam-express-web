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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useCreateAccountMutation,
  useUpdateAccountMutation,
} from "@/services/hooks/accounts/useAccountsMutation";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

function AccountDialog({ open, onClose, editAccount }) {
  const queryClient = useQueryClient();
  const createAccount = useCreateAccountMutation();
  const updateAccount = useUpdateAccountMutation();

  const [rol, setRol] = useState("admin");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (editAccount) {
      setRol(editAccount.role);
      setName(editAccount.name);
      setPassword(editAccount.password);
    } else {
      setRol("admin");
      setName("");
      setPassword("");
    }
  }, [editAccount]);

  const onSubmit = useCallback(() => {
    if (editAccount) {
      updateAccount.mutate(
        {
          id: editAccount._id,
          bulk: {
            name: name,
            password: password,
            role: rol,
          },
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["getAccounts"],
            });
            toast.success("Cuenta actualizada");
            onClose();
          },
        }
      );
    } else {
      createAccount.mutate(
        {
          name: name,
          password: password,
          role: rol,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["getAccounts"],
            });
            toast.success("Cuenta creada");
            onClose();
          },
        }
      );
      onClose();
    }
  }, [
    editAccount,
    name,
    password,
    rol,
    createAccount,
    updateAccount,
    queryClient,
    onClose,
  ]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>
            {editAccount ? "Editar cuenta" : "Crear cuenta"}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form className="flex flex-col space-y-5">
          <div className="space-y-2">
            <Label>Nombre</Label>
            <Input
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Contraseña</Label>
            <Input
              placeholder="contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Rol</Label>
            <Select value={rol} onValueChange={(e) => setRol(e)} name="name">
              <SelectTrigger>
                <SelectValue placeholder="Selecciona el rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="admin">admin</SelectItem>
                  <SelectItem value="cargas virtuales">
                    cargas virtuales
                  </SelectItem>
                  <SelectItem value="pagos">pagos</SelectItem>
                  <SelectItem value="pedidos">pedidos</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </form>
        <DialogFooter className="mt-10 space-x-10 gap-5">
          <Button onClick={onSubmit} className="w-28">
            {editAccount ? "Actualizar" : "Crear"}
          </Button>
          <Button variant="outline" onClick={onClose} className="w-28">
            Cancelar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AccountDialog;
