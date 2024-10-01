import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAccountStore } from "@/store/useAccountStore";
import { Printer } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { paymentsApiService } from "@/services/paymentsApiService";
import { usePaymentSessionStore } from "@/store/usePaymentSessionStore";
import { useUpdatePaymentSessionMutation } from "@/services/hooks/paymentSession/usePaymentSessionMutation";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import "./styles.css";
import { useGetPaymentsQuery } from "@/services/hooks/payment/usePaymentsQuery";

function ClosePaymentSessionModal({ open, onClose }) {
  const queryClient = useQueryClient();
  const printRef = useRef<HTMLDivElement>(null);
  const { paymentsession } = usePaymentSessionStore();
  const updatePaymentSession = useUpdatePaymentSessionMutation();
  const [alertDialog, setAlertDialog] = useState(false);
  const { account, setCloseSession } = useAccountStore();
  const [totalCash, setTotalCash] = useState(0);
  const [totalTransfer, setTotalTransfer] = useState(0);
  const [total, setTotal] = useState(0);
  const { data: payments } = useGetPaymentsQuery({ id: paymentsession?._id });

  useEffect(() => {
    if (paymentsession && open) {
      const getPayments = async () => {
        const payments = await paymentsApiService.getPayments(
          paymentsession?._id
        );
        const cash =
          payments?.cash?.reduce((acc, payment) => acc + payment.amount, 0) ||
          0;
        const transfer =
          payments?.transfer?.reduce(
            (acc, payment) => acc + payment.amount,
            0
          ) || 0;
        setTotalCash(cash);
        setTotalTransfer(transfer);
        setTotal(cash + transfer);
      };
      getPayments();
    }
  }, [paymentsession, open]);

  const balance = useMemo(() => {
    const totalChange = paymentsession?.total || 0;
    const res = totalChange - total;
    return res;
  }, [total, paymentsession]);

  const handlePrint = () => {
    const printContent = printRef.current;
    const printWindow = window.open("", "", "width=800,height=600");
    if (!printWindow) {
      return;
    }
    if (!printContent) {
      return;
    }

    const styles = Array.from(document.styleSheets)
      .map((styleSheet) => {
        try {
          return Array.from(styleSheet.cssRules)
            .map((rule) => rule.cssText)
            .join("");
        } catch (e) {
          console.error(e);
          return "";
        }
      })
      .join("");

    printWindow.document.write(`
      <html>
        <head>
          <style>${styles}</style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();

    printWindow.onafterprint = () => {
      if (!account?._id) {
        return;
      }
      updatePaymentSession.mutate(
        {
          id: paymentsession?._id || "",
          bulk: {
            closed: true,
            total: paymentsession?.total || 0,
            cash: paymentsession?.cash || 0,
            transfer: paymentsession?.transfer || 0,
            balance,
            totalPayments: total,
          },
        },
        {
          onSuccess: () => {
            toast.success("Caja cerrada");
            queryClient.invalidateQueries({
              queryKey: ["getActivePaymentSession"],
            });
            setCloseSession();
          },
        }
      );
    };

    printWindow.print();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[650px]" ref={printRef}>
        <DialogHeader>
          <div className="flex gap-20">
            <DialogTitle>Cierre de sesion</DialogTitle>
          </div>
          <DialogDescription>Cuenta: {account?.name}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <div>
            <Label className="">Pagos con efectivo</Label>
            <Input readOnly value={totalCash.toLocaleString("de-DE")} />
          </div>
          <div>
            <Label className="">Pagos con transferencia</Label>
            <Input readOnly value={totalTransfer.toLocaleString("de-DE")} />
          </div>
          <div>
            <Label className="">Total de pagos</Label>
            <Input readOnly value={total.toLocaleString("de-DE")} />
          </div>
          <div>
            <Label className="">Balance</Label>
            <Input readOnly value={balance.toLocaleString("de-DE")} />
          </div>
        </div>
        <Separator />
        <div className="only-app">
          <Button
            onClick={() => {
              setAlertDialog(true);
            }}
            className=" w-full"
            // disabled={!dateInp || Number(total) < 1}
          >
            <Printer className="mr-2 h-4 w-4" /> Imprimir
          </Button>
        </div>
        <div className="print-only flex flex-col gap-2 mt-10">
          <h1 className="text-left font-bold text-xl">Egresos</h1>
          <div className="flex flex-1 mt-5">
            <div className="flex flex-1 flex-col">
              <h1 className="mb-2 font-semibold">Efectivo</h1>
              {payments?.cash?.map((item) => (
                <div className="flex items-center gap-2">
                  <div className="min-w-24">
                    <p>$ {item.amount?.toLocaleString("de-DE")}</p>
                  </div>
                  <p>{item.description}</p>
                </div>
              )) || <p>No hay pagos en efectivo.</p>}
            </div>
            <div className="flex flex-1 flex-col">
              <h1 className="mb-2 font-semibold">Transferencias</h1>
              {payments?.transfer?.map((item) => (
                <div className="flex items-center gap-2">
                  <div className="min-w-24">
                    <p>$ {item.amount?.toLocaleString("de-DE")}</p>
                  </div>
                  <p>{item.description}</p>
                </div>
              )) || <p>No hay transferencias.</p>}
            </div>
          </div>
        </div>
      </DialogContent>
      <AlertDialog
        open={alertDialog}
        onOpenChange={() => setAlertDialog(false)}
      >
        <AlertDialogContent>
          <AlertDialogTitle>Estas seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta accion imprimira el cierre de caja y cerrara sesion.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <Button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setAlertDialog(false);
              }}
            >
              Cancelar
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                if (!account?._id) {
                  return;
                }
                handlePrint();
              }}
            >
              Aceptar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  );
}

export default ClosePaymentSessionModal;
