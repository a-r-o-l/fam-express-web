import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "@mantine/form";
import { useUpdateAccountMutation } from "@/services/hooks/accounts/useAccountsMutation";
import { useAccountStore } from "@/store/useAccountStore";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateClashClosingMutation } from "@/services/hooks/cashClosing/useCashClosingMutation";
import { CalendarIcon, Printer, ScissorsIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import dayjs from "dayjs";
import CustomInputWithBadge from "../Form/CustomInputWithBadge";
import { Separator } from "@/components/ui/separator";
import CustomInput from "../Form/CustomInput";
import "./styles.css";
import { Input } from "@/components/ui/input";
import { http } from "@/services/http";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { salesApiService } from "@/services/salesApiService";

function CloseBoxModal({ open, onClose, services }) {
  const tenRef = useRef(null);
  const twentyRef = useRef(null);
  const fiftyRef = useRef(null);
  const houndredRef = useRef(null);
  const twoHoundredRef = useRef(null);
  const fiveHoundredRef = useRef(null);
  const thousandRef = useRef(null);
  const twoThousandRef = useRef(null);
  const tenThousandRef = useRef(null);
  const chachosRef = useRef(null);
  const printRef = useRef<HTMLDivElement>(null);

  const [alertDialog, setAlertDialog] = useState(false);
  const [profit, setProfit] = useState(0);
  const [totalSalesAmount, setTotalSalesAmount] = useState(0);
  const [dateInp, setDateInp] = useState<Date>();

  const { account, setCloseSession } = useAccountStore();
  const updateAccount = useUpdateAccountMutation();
  const createCashClosing = useCreateClashClosingMutation();
  const queryClient = useQueryClient();

  const date = useMemo(() => dayjs().toDate().toISOString(), []);

  const form = useForm({
    mode: "controlled",
    initialValues: {
      coin: "0",
      ten: "0",
      twenty: "0",
      fifty: "0",
      houndred: "0",
      twoHoundred: "0",
      fiveHoundred: "0",
      thousand: "0",
      twoThousand: "0",
      tenThousand: "0",
      chachos: "0",
    },
  });

  const handleKeyDown = (event, nextRef) => {
    if (event.key === "Enter") {
      event.preventDefault();
      nextRef.current?.focus();
    }
  };

  const handleBlur = (e) => {
    const value = e.target.value;
    const formatedValue = !value ? "0.00" : Number(value).toFixed(2);
    form.setFieldValue(e.target.name, formatedValue);
  };

  const handleFocus = (event) => {
    event.target.select();
  };

  const totalValues = useMemo(() => {
    const {
      coin,
      ten,
      twenty,
      fifty,
      houndred,
      twoHoundred,
      fiveHoundred,
      thousand,
      twoThousand,
      tenThousand,
      chachos,
    } = form.getValues();
    return {
      coin: Number(coin) ? (Number(coin) * 1).toLocaleString("de-DE") : "0.00",
      ten: Number(ten) ? (Number(ten) * 10).toLocaleString("de-DE") : "0.00",
      twenty: Number(twenty)
        ? (Number(twenty) * 20).toLocaleString("de-DE")
        : "0.00",
      fifty: Number(fifty)
        ? (Number(fifty) * 50).toLocaleString("de-DE")
        : "0.00",
      houndred: Number(houndred)
        ? (Number(houndred) * 100).toLocaleString("de-DE")
        : "0.00",
      twoHoundred: Number(twoHoundred)
        ? (Number(twoHoundred) * 200).toLocaleString("de-DE")
        : "0.00",
      fiveHoundred: Number(fiveHoundred)
        ? (Number(fiveHoundred) * 500).toLocaleString("de-DE")
        : "0.00",
      thousand: Number(thousand)
        ? (Number(thousand) * 1000).toLocaleString("de-DE")
        : "0.00",
      twoThousand: Number(twoThousand)
        ? (Number(twoThousand) * 2000).toLocaleString("de-DE")
        : "0.00",
      tenThousand: Number(tenThousand)
        ? (Number(tenThousand) * 10000).toLocaleString("de-DE")
        : "0.00",
      chachos: Number(chachos)
        ? (Number(chachos) * 1).toLocaleString("de-DE")
        : "0.00",
    };
  }, [form]);

  const total = useMemo(() => {
    return Object.values(totalValues)
      .reduce((acc, curr) => {
        const numericCurr = Number(curr.replace(/\./g, ""));
        return acc + numericCurr;
      }, 0)
      .toLocaleString("de-DE");
  }, [totalValues]);

  const balance = useMemo(() => {
    const totalAmount = totalSalesAmount || 0;
    const totalCash = Number(total.replace(/\./g, ""));
    const change = account?.session?.change || 0;
    const totalProfit = profit || 0;
    const result = totalCash - totalAmount - change - totalProfit;
    return result || 0;
  }, [total, account?.session?.change, totalSalesAmount, profit]);

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
      createCashClosing.mutate(
        {
          account: account._id,
          date: dayjs(dateInp).format("YYYY-MM-DD"),
          total: Number(total.replace(/\./g, "")),
          sale_amount: Number(totalSalesAmount),
          balance: balance,
          coin: Number(form.getValues().coin),
          ten: Number(form.getValues().ten),
          twenty: Number(form.getValues().twenty),
          fifty: Number(form.getValues().fifty),
          houndred: Number(form.getValues().houndred),
          twoHoundred: Number(form.getValues().twoHoundred),
          fiveHoundred: Number(form.getValues().fiveHoundred),
          thousand: Number(form.getValues().thousand),
          twoThousand: Number(form.getValues().twoThousand),
          tenThousand: Number(form.getValues().tenThousand),
          chachos: Number(form.getValues().chachos),
          Profit: profit,
          change: account?.session?.change || 0,
        },
        {
          onSuccess: () => {
            updateAccount.mutate(
              {
                id: account._id!,
                bulk: {
                  session: null,
                },
              },
              {
                onSuccess: () => {
                  toast.success("Caja cerrada");
                  setCloseSession();
                  queryClient.invalidateQueries({
                    queryKey: ["getAccount", account?._id],
                  });
                  onClose();
                  printWindow.close();
                },
                onError: (error) => {
                  console.log(error);
                  toast.error(
                    "Error al cerrar caja, por favor intenta de nuevo"
                  );
                  printWindow.close();
                },
              }
            );
          },
          onError: (error) => {
            console.log(error);
            toast.error("Error al cerrar caja, por favor intenta de nuevo");
            printWindow.close();
          },
        }
      );
    };

    printWindow.print();
  };

  useEffect(() => {
    if (open && account?._id) {
      const getAccount = async () => {
        const response = await http.get(`/account/${account?._id}`);
        const data = response.data;
        setProfit(data?.session?.profit || 0);
      };
      const getSalesAmount = async () => {
        const res = await salesApiService.getSaleAmountByDay(
          account?.session?._id,
          account?._id
        );
        setTotalSalesAmount(res.totalAmount);
      };
      getAccount();
      getSalesAmount();
    }
  }, [open, account]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[650px]" ref={printRef}>
        <DialogHeader>
          <div className="flex gap-20">
            <DialogTitle>Cierre de caja</DialogTitle>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateInp ? (
                    dayjs(dateInp).format("DD/MM/YY")
                  ) : (
                    <span>Selecciona una fecha</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dateInp}
                  onSelect={(date) => {
                    setDateInp(date);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <DialogDescription>Turno: {account?.name}</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CustomInputWithBadge
            handleBlur={handleBlur}
            handleFocus={handleFocus}
            handleKeyDown={(e) => handleKeyDown(e, twentyRef)}
            labelName="10"
            htmlFor="ten"
            badgeContent={totalValues.ten}
            ref={tenRef}
            key={form.key("ten")}
            {...form.getInputProps("ten")}
          />
          <CustomInputWithBadge
            handleBlur={handleBlur}
            handleFocus={handleFocus}
            handleKeyDown={(e) => handleKeyDown(e, fiftyRef)}
            labelName="20"
            htmlFor="20"
            badgeContent={totalValues.twenty}
            ref={twentyRef}
            key={form.key("twenty")}
            {...form.getInputProps("twenty")}
          />
          <CustomInputWithBadge
            handleBlur={handleBlur}
            handleFocus={handleFocus}
            handleKeyDown={(e) => handleKeyDown(e, houndredRef)}
            labelName="50"
            htmlFor="50"
            badgeContent={totalValues.fifty}
            ref={fiftyRef}
            key={form.key("fifty")}
            {...form.getInputProps("fifty")}
          />
          <CustomInputWithBadge
            handleBlur={handleBlur}
            handleFocus={handleFocus}
            handleKeyDown={(e) => handleKeyDown(e, twoHoundredRef)}
            labelName="100"
            htmlFor="100"
            badgeContent={totalValues.houndred}
            ref={houndredRef}
            key={form.key("houndred")}
            {...form.getInputProps("houndred")}
          />
          <CustomInputWithBadge
            handleBlur={handleBlur}
            handleFocus={handleFocus}
            handleKeyDown={(e) => handleKeyDown(e, fiveHoundredRef)}
            labelName="200"
            htmlFor="200"
            badgeContent={totalValues.twoHoundred}
            ref={twoHoundredRef}
            key={form.key("twoHoundred")}
            {...form.getInputProps("twoHoundred")}
          />
          <CustomInputWithBadge
            handleBlur={handleBlur}
            handleFocus={handleFocus}
            handleKeyDown={(e) => handleKeyDown(e, thousandRef)}
            labelName="500"
            htmlFor="500"
            badgeContent={totalValues.fiveHoundred}
            ref={fiveHoundredRef}
            key={form.key("fiveHoundred")}
            {...form.getInputProps("fiveHoundred")}
          />
          <CustomInputWithBadge
            handleBlur={handleBlur}
            handleFocus={handleFocus}
            handleKeyDown={(e) => handleKeyDown(e, twoThousandRef)}
            labelName="1000"
            htmlFor="1000"
            badgeContent={totalValues.thousand}
            ref={thousandRef}
            key={form.key("thousand")}
            {...form.getInputProps("thousand")}
          />
          <CustomInputWithBadge
            handleBlur={handleBlur}
            handleFocus={handleFocus}
            handleKeyDown={(e) => handleKeyDown(e, tenThousandRef)}
            labelName="2000"
            htmlFor="2000"
            badgeContent={totalValues.twoThousand}
            ref={twoThousandRef}
            key={form.key("twoThousand")}
            {...form.getInputProps("twoThousand")}
          />
          <CustomInputWithBadge
            handleBlur={handleBlur}
            handleFocus={handleFocus}
            handleKeyDown={(e) => handleKeyDown(e, chachosRef)}
            labelName="10000"
            htmlFor="10000"
            badgeContent={totalValues.tenThousand}
            ref={tenThousandRef}
            key={form.key("tenThousand")}
            {...form.getInputProps("tenThousand")}
          />
          <CustomInputWithBadge
            handleBlur={handleBlur}
            handleFocus={handleFocus}
            handleKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                e.stopPropagation();
                setAlertDialog(true);
              }
            }}
            labelName="Otros"
            htmlFor="otros"
            badgeContent={totalValues.chachos}
            ref={chachosRef}
            key={form.key("chachos")}
            {...form.getInputProps("chachos")}
          />
        </div>
        <Separator />
        <div className="space-y-4 flex flex-col items-center">
          <CustomInput
            labelName="Total"
            labelClassName="font-extrabold w-20"
            inputClassName="w-60"
            value={total}
            readOnly
          />
          <CustomInput
            labelName="Cambio"
            labelClassName="w-20"
            inputClassName="w-60"
            value={
              account?.session?.change !== undefined
                ? account.session.change
                : "0.00"
            }
            readOnly
          />
          <CustomInput
            labelName="Ventas"
            labelClassName="w-20"
            inputClassName="w-60"
            value={
              totalSalesAmount
                ? totalSalesAmount.toLocaleString("de-DE")
                : "0.00"
            }
            readOnly
          />

          <CustomInput
            labelName="Ganancia"
            labelClassName="w-20"
            inputClassName="w-60"
            value={profit ? profit.toLocaleString("de-DE") : "0.00"}
            readOnly
          />
          <CustomInput
            labelName="Balance"
            labelClassName="font-bold w-20"
            inputClassName={`w-60 ${
              balance < 0 ? "bg-red-500 text-white" : "bg-green-300"
            }`}
            value={balance ? balance : "0.00"}
            readOnly
          />
        </div>
        <div className="only-app">
          <Button
            onClick={() => {
              setAlertDialog(true);
            }}
            className=" w-full"
            disabled={!dateInp || Number(total) < 1}
          >
            <Printer className="mr-2 h-4 w-4" /> Imprimir
          </Button>
        </div>
        <div className="print-only flex flex-col gap-2">
          <div className="flex items-center  pb-5">
            <ScissorsIcon className="w-5 h-5" />
            <div className="flex w-full border-t border-dashed"></div>
          </div>
          <p className="mb-2">
            {account?.name === "mañana"
              ? "Recibe turno Tarde"
              : account?.name === "tarde"
              ? "Recibe turno Noche"
              : "Recibe turno Mañana"}
          </p>
          {services?.map((item) => {
            return (
              <div key={item._id} className="flex items-center">
                <p className="w-40">{item.name}</p>
                <Input readOnly value={item.amount} className="w-60" />
              </div>
            );
          })}
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

export default CloseBoxModal;
