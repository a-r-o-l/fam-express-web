import React, { useState } from "react";
import { Button } from "../ui/button";
import { ChevronDown, Layers, LogOut, PanelBottomClose } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
// import ThemeButton from "../custom/Button/ThemeButton";
import { useAccountStore } from "@/store/useAccountStore";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import OpeningModal from "../custom/Modal/OpeningModal";
import { useGetServicesQuery } from "@/services/hooks/services/useServicesQuery";

function Header({ isSidebarOpen, setIsSidebarOpen }) {
  const { account, setCloseSession } = useAccountStore();
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { data: services } = useGetServicesQuery();
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Button
          variant="destructive"
          size="sm"
          className="md:hidden"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Layers className="h-6 w-6" />
        </Button>
        <h1 className="text-lg font-semibold"></h1>
        <div className="flex items-center">
          {/* <ThemeButton/> */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="lg" className="flex items-center">
                <span className="mr-2">
                  {(account?.name ?? "")?.toUpperCase()}
                </span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel onClick={() => console.log(account)}>
                Mi Cuenta
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {account?.role !== "admin" && (
                <DropdownMenuItem onClick={() => setOpenModal(true)}>
                  <PanelBottomClose className="mr-2 h-4 w-4" />
                  <span>Cerrar caja</span>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => setOpenAlert(true)}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar sesion</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <OpeningModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        services={services}
      />
      <AlertDialog open={openAlert} onOpenChange={() => setOpenAlert(false)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Alerta</AlertDialogTitle>
            <AlertDialogDescription>
              Estas seguro de querer cerrar sesión?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => setCloseSession()}>
              Aceptar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </header>
  );
}

export default Header;
