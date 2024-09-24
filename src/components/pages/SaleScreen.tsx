import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { RenderIcon } from "@/utils/RenderIcon";
import { useCreateSaleMutation } from "@/services/hooks/sales/useSalesMutation";
import dayjs from "dayjs";
import { useQueryClient } from "@tanstack/react-query";
import { useGetServicesQuery } from "@/services/hooks/services/useServicesQuery";
import { PartialServiceInt } from "@/types/ServiceTypes";
import { useGetSalesQuery } from "@/services/hooks/sales/useSalesQuery";
import { ScrollArea } from "../ui/scroll-area";
import { toast } from "sonner";
import axios from "axios";
import { useAccountStore } from "@/store/useAccountStore";
import { Banknote } from "lucide-react";
import { useGetAccountQuery } from "@/services/hooks/accounts/useAccountsQuery";

function SaleScreen() {
  const inputRefs = useRef({});
  const { account } = useAccountStore();
  const queryClient = useQueryClient();
  const createSale = useCreateSaleMutation();
  const { data: services } = useGetServicesQuery();
  const [selectedService, setSelectedService] = useState<string>("sirve");
  const [value, setValue] = useState("");
  const { data: sales } = useGetSalesQuery();
  const { data: accountFromBd } = useGetAccountQuery(
    { id: account?._id },
    {
      enabled: !account?.session?.opening,
      queryKey: ["getAccount", account?._id ? account._id : ""],
      refetchInterval: 50000,
    }
  );

  useEffect(() => {
    if (selectedService && inputRefs.current[selectedService]) {
      inputRefs.current[selectedService].focus();
    }
  }, [selectedService]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedService === "") {
        if (e.key === "ArrowRight") {
          setSelectedService(services?.[0]?.name || "");
        } else if (e.key === "ArrowLeft") {
          setSelectedService(services?.[services.length - 1]?.name || "");
        }
      }
      if (e.key === "Escape" && selectedService !== "") {
        setSelectedService("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedService, services]);

  const handleSubmit = useCallback(
    (service: PartialServiceInt) => {
      if (!value) {
        toast.error("Debes ingresar un monto");
        return;
      }
      if (!account) {
        toast.error("No hay credenciales");
        return;
      }
      createSale.mutate(
        {
          service: service._id,
          amount: value ? parseInt(value) : 0,
          date: dayjs().toDate(),
          account: account?._id,
          session: account.session?._id,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["getSales"],
            });
            queryClient.invalidateQueries({
              queryKey: ["getServices"],
            });
            setValue("");
            toast.success("Venta realizada con éxito");
          },
          onError: (error) => {
            if (axios.isAxiosError(error)) {
              if (error.response?.status === 414) {
                toast.error(error.response.data?.message);
                return;
              }
            }
            toast.error("Error al realizar la venta");
          },
        }
      );
    },
    [value, account, createSale, queryClient]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!selectedService || !services) return;

    const currentIndex = services.findIndex(
      (service) => service.name === selectedService
    );
    if (currentIndex === -1) return;

    if (e.key === "ArrowRight") {
      const nextIndex = (currentIndex + 1) % services.length;
      setSelectedService(services[nextIndex].name || "");
    } else if (e.key === "ArrowLeft") {
      const prevIndex = (currentIndex - 1 + services.length) % services.length;
      setSelectedService(services[prevIndex].name || "");
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        {services?.length ? (
          services.map((ser) => {
            return (
              <Card key={ser._id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {(ser.name ?? "").toUpperCase()}
                  </CardTitle>
                  <RenderIcon name={ser.name} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    $ {ser?.amount?.toLocaleString("de-DE")}
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <></>
        )}
        <Card className="bg-green-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {"cambio".toUpperCase()}
            </CardTitle>
            <Banknote />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${" "}
              {accountFromBd?.session?.change
                ? accountFromBd.session?.change?.toLocaleString("de-DE")
                : account?.session?.change?.toLocaleString("de-DE")}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 mb-8 md:grid-cols-1">
        <Card onKeyDown={handleKeyDown} tabIndex={0}>
          <CardHeader>
            <CardTitle>Nueva Venta</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-center justify-evenly text-muted-foreground gap-10 px-10">
              {services?.length ? (
                services.map((service: PartialServiceInt) => {
                  if (!service) {
                    return <></>;
                  }
                  return (
                    <div
                      key={service._id}
                      className={`flex flex-col w-full cursor-pointer hover:scale-105 transition-transform ${
                        selectedService !== service.name ? "opacity-20" : ""
                      }`}
                      onClick={() => setSelectedService(service?.name || "")}
                    >
                      <Card>
                        <CardHeader>
                          <CardTitle>
                            {(service?.name ?? "").toUpperCase()}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">
                            <Input
                              placeholder="monto"
                              value={
                                selectedService === service.name ? value : ""
                              }
                              onChange={(e) => setValue(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  handleSubmit(service);
                                }
                              }}
                              onFocus={() => {
                                setValue("");
                              }}
                              ref={(el) => {
                                if (service.name) {
                                  inputRefs.current[service.name] = el;
                                }
                              }}
                            />
                            <div className="flex w-full my-5">
                              <Button
                                variant="default"
                                className="w-full"
                                onClick={() => handleSubmit(service)}
                              >
                                Enviar
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  );
                })
              ) : (
                <></>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ventas recientes</CardTitle>
          <CardDescription>
            Tenes {sales?.length} ventas recientes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-60">
            <div className="space-y-4">
              {sales?.map((sale) => (
                <div key={sale?._id} className="flex items-center">
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={`/placeholder.svg?height=36&width=36`}
                      alt="Avatar"
                    />
                    <AvatarFallback>
                      {(sale?.account?.name
                        ? sale.account.name[0]
                        : ""
                      ).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      $ {sale?.amount?.toLocaleString("de-DE")}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {sale?.service?.name}
                    </p>
                  </div>
                  <div className="ml-auto font-medium text-sm">
                    {dayjs(sale?.date).fromNow()}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}

export default SaleScreen;
