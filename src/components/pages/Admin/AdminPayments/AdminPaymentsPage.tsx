import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import dayjs from "dayjs";
import {
  Calendar,
  EllipsisVertical,
  Pencil,
  ReceiptText,
  Trash,
} from "lucide-react";
import { useGetPaymentsQuery } from "@/services/hooks/payment/usePaymentsQuery";
import { useGetAllPaymentSessionsQuery } from "@/services/hooks/paymentSession/usePaymentSessionQuery";
import { PartialPaymentSessionInt } from "@/types/PaymentSessionTypes";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import ImageModal from "../../Payments/components/ImageModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function AdminPaymentsPage() {
  const [selectedSession, setSelectedSession] =
    useState<PartialPaymentSessionInt | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { data: paymentsSession } = useGetAllPaymentSessionsQuery();
  const { data: payments } = useGetPaymentsQuery({ id: selectedSession?._id });

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="container mx-auto p-4">
        <div className="flex flex-col lg:flex-row gap-6">
          <Card className="w-full lg:w-1/3">
            <CardHeader>
              <CardTitle>Sesiones</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[70vh]">
                <div className="space-y-2">
                  {paymentsSession?.map((session) => (
                    <Button
                      key={session._id}
                      variant={
                        selectedSession?._id === session._id
                          ? "default"
                          : "outline"
                      }
                      className="w-full justify-start"
                      onClick={() => setSelectedSession(session)}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      <span className="flex-1 text-left">
                        {dayjs(session.date).format("DD/MM/YY")}
                      </span>
                      <span className="font-semibold">${session.balance}</span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="h-8 w-8 p-0 rounded-full"
                            size="icon"
                            onClick={() => setSelectedSession(session)}
                          >
                            <EllipsisVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>
                            {dayjs(session.date).format("DD/MM/YY")}
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <ReceiptText className="h-4 w-4 mr-2" />
                            Ver
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {}}>
                            <Pencil className="h-4 w-4 mr-2" />
                            Editar
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            className="text-red-500"
                            onClick={() => {}}
                          >
                            <Trash className="h-4 w-4 mr-2" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card className="w-full lg:w-2/3">
            <CardHeader>
              <CardTitle>Pagos</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedSession ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Descripcion</TableHead>
                      <TableHead>Importe</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Recibo</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments?.cash?.map((payment) => (
                      <TableRow key={payment._id}>
                        <TableCell>{payment.description}</TableCell>
                        <TableCell>${payment.amount}</TableCell>
                        <TableCell>Efectivo</TableCell>
                        {/* <TableCell>
                          {payment?.receipt ? (
                            <Button
                              variant="outline"
                              size="icon"
                              className="rounded-full bg-blue-500 text-white"
                              onClick={() =>
                                setSelectedImage(payment?.receipt || null)
                              }
                            >
                              <ReceiptText className="h-4 w-4" />
                            </Button>
                          ) : (
                            <Button
                              variant="secondary"
                              size="icon"
                              className="rounded-full bg-red-500 text-white"
                            >
                              <ReceiptText className="h-4 w-4" />
                            </Button>
                          )}
                        </TableCell> */}
                        <TableCell className="text-left">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <EllipsisVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>
                                {payment.description}
                              </DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                disabled={!payment?.receipt}
                                onClick={() => {
                                  setSelectedImage(payment?.receipt || null);
                                }}
                              >
                                <ReceiptText className="h-4 w-4 mr-2" />
                                Ver
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => {}}>
                                <Pencil className="h-4 w-4 mr-2" />
                                Editar
                              </DropdownMenuItem>

                              <DropdownMenuItem
                                className="text-red-500"
                                onClick={() => {}}
                              >
                                <Trash className="h-4 w-4 mr-2" />
                                Eliminar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                    {payments?.transfer?.map((payment) => (
                      <TableRow key={payment._id}>
                        <TableCell>{payment.description}</TableCell>
                        <TableCell>${payment.amount}</TableCell>
                        <TableCell>Transferencia</TableCell>
                        {/* <TableCell>
                          {payment?.receipt ? (
                            <Button
                              variant="outline"
                              size="icon"
                              className="rounded-full bg-blue-500 text-white"
                              onClick={() =>
                                setSelectedImage(payment?.receipt || null)
                              }
                            >
                              <ReceiptText className="h-4 w-4" />
                            </Button>
                          ) : (
                            <Button
                              variant="secondary"
                              size="icon"
                              className="rounded-full bg-red-500 text-white"
                            >
                              <ReceiptText className="h-4 w-4" />
                            </Button>
                          )}
                        </TableCell> */}
                        <TableCell className="text-left">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <EllipsisVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>
                                {payment.description}
                              </DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                disabled={!payment?.receipt}
                                onClick={() => {
                                  setSelectedImage(payment?.receipt || null);
                                }}
                              >
                                <ReceiptText className="h-4 w-4 mr-2" />
                                Ver
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => {}}>
                                <Pencil className="h-4 w-4 mr-2" />
                                Editar
                              </DropdownMenuItem>

                              <DropdownMenuItem
                                className="text-red-500"
                                onClick={() => {}}
                              >
                                <Trash className="h-4 w-4 mr-2" />
                                Eliminar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center text-muted-foreground">
                  No hay una sección seleccionada
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <ImageModal
        open={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        imageUrl={selectedImage || ""}
      />
    </div>
  );
}

export default AdminPaymentsPage;
