import { useEffect, useMemo, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import PaymentsAside from "./PaymentsAside";
import Header from "./Header";
import { useAccountStore } from "@/store/useAccountStore";
import { usePaymentSessionStore } from "@/store/usePaymentSessionStore";
import { useQueryClient } from "@tanstack/react-query";
import { useGetActivePaymentSessionQuery } from "@/services/hooks/paymentSession/usePaymentSessionQuery";
import { useCreatePaymentSessionMutation } from "@/services/hooks/paymentSession/usePaymentSessionMutation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import dayjs from "dayjs";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { PartialPaymentSessionInt } from "@/types/PaymentSessionTypes";
import PaymentHeader from "../pages/Payments/components/PaymentHeader";

function PaymentsAppTemplate() {
  const { paymentsession, setPaymentSession } = usePaymentSessionStore();
  const {
    account,
    setCreateSession,
    accessToken,
    refreshToken,
    setCloseSession,
  } = useAccountStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [cash, setCash] = useState("");
  const [transfer, setTransfer] = useState("");
  const { data: activePaymentSession } = useGetActivePaymentSessionQuery();
  const createPaymentSession = useCreatePaymentSessionMutation();

  const total = useMemo(() => {
    return Number(cash) + Number(transfer);
  }, [cash, transfer]);

  useEffect(() => {
    if (!account) {
      const accessToken = localStorage.getItem("access-token");
      const refreshToken = localStorage.getItem("refresh-token");
      if (accessToken && refreshToken) {
        setCreateSession(accessToken, refreshToken);
      } else {
        navigate("/login");
      }
    } else {
      if (account?.role !== "pagos") {
        setCloseSession();
        navigate("/login");
      }
    }
  }, [
    account,
    accessToken,
    setCreateSession,
    navigate,
    refreshToken,
    setCloseSession,
  ]);

  useEffect(() => {
    if (!activePaymentSession?.length) {
      setOpenModal(true);
    } else {
      setOpenModal(false);
    }
  }, [paymentsession, activePaymentSession]);

  return (
    <div className="flex h-screen">
      <PaymentsAside
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <PaymentHeader
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <Outlet />
        </main>
      </div>
      <Dialog open={openModal}>
        <DialogContent>
          <div className="dialog-header">
            <DialogTitle>Abrir Caja</DialogTitle>
            <DialogDescription>
              Para comenzar debes abrir caja
            </DialogDescription>
          </div>
          <div>
            <Label htmlFor="cash">Efectivo</Label>
            <Input
              id="cash"
              placeholder="Ingresar el importe del efectivo"
              autoComplete="off"
              autoFocus
              value={cash}
              onChange={(e) => setCash(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="transfer">Banco</Label>
            <Input
              id="transfer"
              placeholder="Ingresar el importe de la cuenta bancaria"
              autoComplete="off"
              value={transfer}
              onChange={(e) => setTransfer(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="total">Total de dinero</Label>
            <Input id="total" autoComplete="off" value={total} readOnly />
          </div>
          <DialogFooter>
            <div className="flex flex-col justify-center gap-5 w-full mt-10">
              <Button
                variant="destructive"
                onClick={() => {
                  createPaymentSession.mutate(
                    {
                      date: dayjs().format("YYYY-MM-DD"),
                      transfer: Number(transfer),
                      cash: Number(cash),
                      total: total,
                    },
                    {
                      onSuccess: (data: PartialPaymentSessionInt) => {
                        console.log("data=> ", data);
                        setPaymentSession(data);
                        queryClient.invalidateQueries({
                          queryKey: ["getActivePaymentSession"],
                        });
                        toast.success("Sesion abierta");
                        // setOpenModal(false);
                      },
                      onError: (err: unknown) => {
                        if (err instanceof AxiosError && err.response) {
                          toast.error(err.response.data.message);
                        } else {
                          toast.error(
                            "Error al abrir sesion, por favor intenta de nuevo."
                          );
                        }
                      },
                    }
                  );
                }}
              >
                Abrir sesion
              </Button>
              <Button onClick={() => setCloseSession()}>Cerrar sesion</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PaymentsAppTemplate;
