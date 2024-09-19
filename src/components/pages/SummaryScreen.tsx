import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { useMemo, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { es } from "date-fns/locale";
import { useGetSalesByDayQuery } from "@/services/hooks/sales/useSalesQuery";
import dayjs from "dayjs";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import SummaryRenderTable from "../custom/Table/SummaryRenderTable";

function SummaryScreen() {
  const [tabValue, setTabValue] = useState("all-sales");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const {data: sales} = useGetSalesByDayQuery({ date: date ? dayjs(date).toString() : undefined }, {enabled: !!date,
    queryKey: ["getSales", date ? dayjs(date).toString() : null]
  });

  const totalSaleAmount = useMemo(()=>{
    if(!sales?.length){
      return "0.00";
    } else {
      const sum = sales.reduce((acc, sale)=> acc + (sale?.amount ?? 0), 0);
      return sum.toFixed(2);
    }
  },[sales])


  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Sales Calendar</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              locale={es}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <Button variant="destructive">{dayjs(date).format("DD/MM/YY")}</Button>
              <Tabs defaultValue="all-sales" value={tabValue} onValueChange={(e)=> setTabValue(e)}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="all-sales">Todas</TabsTrigger>
                <TabsTrigger value="by-turn">Por turno</TabsTrigger>
              </TabsList>
              </Tabs>
            </CardTitle>
          </CardHeader>
          <CardContent>
           <SummaryRenderTable state={tabValue === "all-sales"} sales={sales} totalSaleAmount={totalSaleAmount} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default SummaryScreen;
