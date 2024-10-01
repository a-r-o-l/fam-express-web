import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useGetPaymentsQuery } from "@/services/hooks/payment/usePaymentsQuery";
import { useAccountStore } from "@/store/useAccountStore";
import { usePaymentSessionStore } from "@/store/usePaymentSessionStore";
import { PartialPaymentInt } from "@/types/PaymentTypes";
import dayjs from "dayjs";
import { Banknote, Landmark, PlusCircle } from "lucide-react";
import { useMemo, useState } from "react";
import CreatePaymentModal from "./components/CreatePaymentModal";
import ImageModal from "./components/ImageModal";
import AddCashModal from "./components/AddCashModal";

function PaymentsScreen() {
  const { accessToken } = useAccountStore();
  const { paymentsession } = usePaymentSessionStore();
  const { data: payments } = useGetPaymentsQuery({ id: paymentsession?._id });
  const [selectedType, setSelectedType] = useState("");

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPayment, setSelectedPayment] =
    useState<PartialPaymentInt | null>(null);

  const totalLength = useMemo(() => {
    const cashLength = payments?.cash?.length || 0;
    const transferLength = payments?.transfer?.length || 0;
    const totalLength = cashLength + transferLength;
    return totalLength;
  }, [payments]);

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex w-full justify-start">
        <div className="border min-w-40 flex justify-center items-center px-4 py-2 rounded-lg bg-black">
          <h1 className="font-medium text-lg text-white">
            {paymentsession?.date
              ? dayjs(paymentsession.date).format("DD/MM/YY")
              : ""}
          </h1>
        </div>
      </div>
      <div className="grid mb-8 grid-cols-2 gap-10 mt-5">
        <Card className="">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium flex gap-2 items-center">
              <Banknote className="h-5 w-5 text-muted-foreground" />
              <span>Efectivo</span>
            </CardTitle>
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full"
              onClick={() => {
                setSelectedType("cash");
              }}
            >
              <PlusCircle className="h-6 w-6" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex justify-between">
              <h1>$ {paymentsession?.cash || "0.00"}</h1>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium flex gap-2 items-center">
              <Landmark className="h-5 w-5 text-muted-foreground" />
              <span>Transferencia</span>
            </CardTitle>
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full"
              onClick={() => {
                setSelectedType("transfer");
              }}
            >
              <PlusCircle className="h-6 w-6" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $ {paymentsession?.transfer || "0.00"}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 mb-8 md:grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center pr-10">
              <p>Pagos recientes</p>
            </CardTitle>
            <CardDescription className="flex justify-between items-center pr-10">
              <p>{`Tenes ${totalLength} pagos realizados`}</p>
              <Button onClick={() => setOpenDialog(true)}>
                Agregar un pago
              </Button>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex">
            <div className="flex flex-1 flex-col px-10">
              <div className="flex w-full justify-start my-2">
                <p className="font-bold text-md">Efectivo</p>
              </div>
              <Separator />
              <ScrollArea className="h-80 pr-5">
                {payments?.cash?.map((item: PartialPaymentInt) => (
                  <div className="space-y-4 mt-5 " key={item._id}>
                    <div className="flex items-center gap-2">
                      <Avatar
                        className="h-12 w-12 rounded-md border justify-center items-center cursor-pointer"
                        onClick={() => {
                          if (item.receipt) {
                            setSelectedPayment(item);
                          }
                        }}
                      >
                        <AvatarImage
                          src={item?.receipt || "./placeholder.png"}
                        />
                      </Avatar>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                        <p className="text-sm font-medium leading-none">
                          $ {item.amount}
                        </p>
                      </div>
                      <div className="ml-auto font-medium text-sm">
                        {dayjs(item.date).fromNow()}
                      </div>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </div>
            <div className="flex flex-1 flex-col px-10">
              <div className="flex w-full justify-start my-2">
                <p className="font-bold text-md">Transferencia</p>
              </div>
              <Separator />
              <ScrollArea className="h-80 pr-5">
                {payments?.transfer?.map((item: PartialPaymentInt) => (
                  <div className="space-y-4 mt-5 " key={item._id}>
                    <div className="flex items-center gap-2">
                      <Avatar
                        className="h-12 w-12 rounded-md border justify-center items-center cursor-pointer"
                        onClick={() => {
                          if (item.receipt) {
                            setSelectedPayment(item);
                          }
                        }}
                      >
                        <AvatarImage
                          src={item?.receipt || "./placeholder.png"}
                        />
                      </Avatar>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                        <p className="text-sm font-medium leading-none">
                          $ {item.amount}
                        </p>
                      </div>
                      <div className="ml-auto font-medium text-sm">
                        {dayjs(item.date).fromNow()}
                      </div>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </div>
          </CardContent>
        </Card>
      </div>
      <CreatePaymentModal
        accessToken={accessToken}
        onClose={() => setOpenDialog(false)}
        openDialog={openDialog}
        paymentsession={paymentsession}
      />
      <ImageModal
        open={!!selectedPayment}
        onClose={() => setSelectedPayment(null)}
        imageUrl={selectedPayment?.receipt || ""}
      />
      <AddCashModal
        type={selectedType}
        openDialog={!!selectedType}
        onClose={() => setSelectedType("")}
      />
    </div>
  );
}

export default PaymentsScreen;
