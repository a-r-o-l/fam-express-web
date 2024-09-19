import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useMemo } from "react";
import AllSalesTable from "./AllSalesTable";
import ByTurnSalesTable from "./ByTurnSalesTable";
import { PartialSaleInt } from "@/types/SaleTypes";
import { PartialAccountInt } from "@/types/AccountTypes";
import { PartialServiceInt } from "@/types/ServiceTypes";

function SummaryRenderTable({ state, sales, totalSaleAmount }) {
  const salesByTurn = useMemo(() => {
    if (!sales?.length) {
      return [];
    } else {
      const salesByTurnObj = sales.reduce(
        (
          acc: { [key: string]: { amount: number; id: string } },
          sale: PartialSaleInt & {
            service: PartialServiceInt;
            account: PartialAccountInt;
          }
        ) => {
          const turn = sale.account.name!;
          if (!acc[turn]) {
            acc[turn] = { amount: 0, id: sale.account._id! };
          }
          acc[turn].amount += sale.amount || 0;
          return acc;
        },
        {} as { [key: string]: { amount: number; id: string } }
      );
  
      return Object.entries(salesByTurnObj).map(([account, value]) => {
        const { amount, id } = value as { amount: number; id: string };
        return {
          account,
          amount,
          id,
        };
      });
    }
  }, [sales]);


  if (state) {
    return (
      <ScrollArea className="h-[400px] w-full rounded-md border">
        <AllSalesTable sales={sales} total={totalSaleAmount} />
      </ScrollArea>
    );
  }
  return (
    <ScrollArea className="h-[400px] w-full rounded-md border">
      <ByTurnSalesTable sales={salesByTurn} total={totalSaleAmount} />
    </ScrollArea>
  );
}

export default SummaryRenderTable;
