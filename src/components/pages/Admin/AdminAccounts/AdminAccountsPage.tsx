import { useGetAccountsQuery } from "@/services/hooks/accounts/useAccountsQuery";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../ui/table";
import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import { Button } from "../../../ui/button";
import { useState } from "react";

import { useDeleteAccountMutation } from "@/services/hooks/accounts/useAccountsMutation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu";
import { PartialAccountInt } from "@/types/AccountTypes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import AccountDialog from "./components/AccountDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

function AdminAccountsPage() {
  const queryClient = useQueryClient();
  const deleteAccount = useDeleteAccountMutation();
  const { data } = useGetAccountsQuery();
  const [open, setOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] =
    useState<PartialAccountInt | null>(null);
  const [editAccount, setEditAccount] = useState<PartialAccountInt | null>(
    null
  );

  return (
    <div className="container mx-auto px-6 py-8">
      <Card className="w-full max-w-7xl mx-auto">
        <CardHeader>
          <CardTitle className="font-semibold text-xl">Cuentas</CardTitle>
          <CardDescription>Todas las cuentas</CardDescription>
          <div className="w-full flex justify-end">
            <Button onClick={() => setOpen(true)}>Crear cuenta</Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="relative h-[400px] w-full overflow-y-auto border rounded-md">
            <Table>
              <TableHeader className="bg-black">
                <TableRow>
                  <TableHead className="text-white">Id</TableHead>
                  <TableHead className="text-white">Nombre</TableHead>
                  <TableHead className="text-white">Contraseña</TableHead>
                  <TableHead className="text-white">Rol</TableHead>
                  <TableHead className="text-white">Creado</TableHead>
                  <TableHead className="text-white">Actualizado</TableHead>
                  <TableHead className="text-white">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.map((account: PartialAccountInt) => (
                  <TableRow key={account?._id}>
                    <TableCell>{account?._id}</TableCell>
                    <TableCell>{account?.name}</TableCell>
                    <TableCell>{account?.password}</TableCell>
                    <TableCell>{account?.role}</TableCell>
                    <TableCell>{account?.createdAt}</TableCell>
                    <TableCell>{account?.updatedAt}</TableCell>
                    <TableCell className="text-left">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            size="icon"
                            variant="outline"
                            className="rounded-full"
                          >
                            <EllipsisVertical className="cursor-pointer h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>{account.name}</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              setEditAccount(account);
                              setOpen(true);
                            }}
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            <span>Editar</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-500"
                            onClick={() => {
                              setSelectedAccount(account ? account : null);
                            }}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Eliminar</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
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
      <AccountDialog
        open={open}
        onClose={() => {
          setOpen(false);
          setEditAccount(null);
        }}
        editAccount={editAccount}
      />
      <AlertDialog
        open={!!selectedAccount}
        onOpenChange={() => setSelectedAccount(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Estas seguro de eliminar la cuenta?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Esta accion no se puede deshacer
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (!selectedAccount) {
                  return;
                }
                deleteAccount.mutate(
                  { id: selectedAccount._id ?? "" },
                  {
                    onSuccess: () => {
                      queryClient.invalidateQueries({
                        queryKey: ["getAccounts"],
                      });
                      toast.success("Cuenta eliminada");
                    },
                  }
                );
              }}
            >
              Aceptar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default AdminAccountsPage;
