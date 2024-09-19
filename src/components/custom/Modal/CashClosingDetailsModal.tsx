import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PartialCashClosingIntWithPopulate } from "@/types/CashClosingTypes";
import dayjs from "dayjs";

type CashClosingDetailsModalProps = {
  open: boolean;
  onClose: () => void;
  cashClosing: PartialCashClosingIntWithPopulate | null;
};

function CashClosingDetailsModal({
  open,
  onClose,
  cashClosing,
}: CashClosingDetailsModalProps) {

  const parseValue = (value: number, amount: number) => {
    const result = value * amount;
    return result.toLocaleString("de-DE");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>Cierre de caja</DialogTitle>
          <DialogDescription>{(cashClosing?.account?.name ?? "").toUpperCase()} - {dayjs(cashClosing?.date).format("DD/MM/YY HH:mm")}</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <div className="flex items-center gap-5">
            <Label className="w-28">M</Label>
            <Badge className="w-36">{cashClosing?.coin}</Badge>
            <Input value={parseValue(1, Number(cashClosing?.coin)) || "0"} readOnly autoFocus={false}/>

          </div>
          <div className="flex items-center gap-5">
            <Label className="w-28">10</Label>
          <Badge className="w-36">{cashClosing?.ten}</Badge>
            <Input value={parseValue(10, Number(cashClosing?.ten)) || "0"} readOnly />
          </div>

          <div className="flex items-center gap-5">
            <Label className="w-28">20</Label>
            <Badge className="w-36">{cashClosing?.twenty}</Badge>
            <Input
              value={parseValue(20, Number(cashClosing?.twenty)) || "0"}
              readOnly
            />

          </div>
          <div className="flex items-center gap-5">
            <Label className="w-28">50</Label>
            <Badge className="w-36">{cashClosing?.fifty}</Badge>
            <Input value={parseValue(50, Number(cashClosing?.fifty)) || "0"} readOnly />

          </div>
          <div className="flex items-center gap-5">
            <Label className="w-28">100</Label>
            <Badge className="w-36">{cashClosing?.houndred}</Badge>
            <Input
              value={parseValue(100, Number(cashClosing?.houndred)) || "0"}
              readOnly
            />

          </div>
          <div className="flex items-center gap-5">
            <Label className="w-28">200</Label>
            <Badge className="w-36">{cashClosing?.twoHoundred}</Badge>
            <Input
              value={parseValue(200, Number(cashClosing?.twoHoundred)) || "0"}
              readOnly
            />

          </div>
          <div className="flex items-center gap-5">
            <Label className="w-28">500</Label>
            <Badge className="w-36">{cashClosing?.fiveHoundred}</Badge>
            <Input
              value={parseValue(500, Number(cashClosing?.fiveHoundred)) || "0"}
              readOnly
            />

          </div>
          <div className="flex items-center gap-5">
            <Label className="w-28">1000</Label>
            <Badge className="w-36">{cashClosing?.thousand}</Badge>
            <Input
              value={parseValue(1000, Number(cashClosing?.thousand)) || "0"}
              readOnly
            />

          </div>
          <div className="flex items-center gap-5">
            <Label className="w-28">2000</Label>
            <Badge className="w-36">{cashClosing?.twoThousand}</Badge>
            <Input
              value={parseValue(2000, Number(cashClosing?.twoThousand)) || "0"}
              readOnly
            />
            
          </div>
          <div className="flex items-center gap-5">
            <Label className="w-28">10000</Label>
            <Badge className="w-36">{cashClosing?.tenThousand}</Badge>
            <Input
              value={parseValue(10000, Number(cashClosing?.tenThousand)) || "0"}
              readOnly
            />
          </div>
          <div className="flex items-center gap-5">
            <Label className="w-28">Otros</Label>
            <Badge className="w-36">{cashClosing?.chachos}</Badge>
            <Input
              value={parseValue(1, Number(cashClosing?.chachos)) || "0"}
              readOnly
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 items-center">
          <div className="flex items-center gap-5">
            <Label className="w-28">Total</Label>
            <Input value={parseValue(1, Number(cashClosing?.total)) || "0"} readOnly />
          </div>
          <div className="flex items-center gap-5">
            <Label className="w-28">Cambio</Label>
            <Input value={cashClosing?.change} readOnly />
          </div>
          <div className="flex items-center gap-5">
            <Label className="w-28">Ventas</Label>
            <Input value={cashClosing?.sale_amount} readOnly />
          </div>
          <div className="flex items-center gap-5">
            <Label className="w-28">Balance</Label>
            <Input
              value={parseValue(1, Number(cashClosing?.balance)) || "0"}
              readOnly
            />
          </div>
          <div className="flex items-center gap-5">
            <Label className="w-28">Ganancias</Label>
            <Input value={parseValue(1, Number(cashClosing?.Profit)) || "0"} readOnly />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CashClosingDetailsModal;
