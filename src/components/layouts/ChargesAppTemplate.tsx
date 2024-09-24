import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Aside from "./Aside";
import Header from "./Header";
import { useAccountStore } from "@/store/useAccountStore";
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
import { useOpenBoxMutation } from "@/services/hooks/auth/useAuthMutation";
import { useQueryClient } from "@tanstack/react-query";
import { LogOut, PanelTopClose } from "lucide-react";

function ChargesAppTemplate() {
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
  const openBox = useOpenBoxMutation();
  // const updateAccount = useUpdateAccountMutation();
  // const { data: accountFromBd, isLoading } = useGetAccountQuery(
  //   { id: account?._id },
  //   {
  //     queryKey: ["getAccount", account?._id ? account._id : ""],
  //   }
  // );
  const [change, setChange] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

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
      if (account?.session) {
        setOpenDialog(false);
      } else {
        setOpenDialog(true);
      }
    }
  }, [
    account,
    accessToken,
    setCreateSession,
    navigate,
    openDialog,
    refreshToken,
  ]);

  return (
    <div className="flex h-screen">
      <Aside
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          {/* {isLoading ? (
            <div className="flex flex-1 justify-center items-center">
              <LoaderCircle className="mt-20 animate-spin" />
            </div>
          ) : ( */}
          <Outlet />
          {/* )} */}
        </main>
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <div className="dialog-header">
            <DialogTitle>Abrir Caja</DialogTitle>
            <DialogDescription>
              Para comenzar debes abrir caja
            </DialogDescription>
          </div>
          <div>
            <Label htmlFor="amount">Cambio</Label>
            <Input
              id="amount"
              placeholder="Ingresar cambio"
              value={change}
              onChange={(e) => setChange(e.target.value)}
              autoComplete="off"
              autoFocus
            />
          </div>
          <DialogFooter>
            <div className="flex flex-col justify-center gap-5 w-full mt-10">
              <Button
                disabled={!change}
                variant="destructive"
                onClick={() => {
                  if (!account?._id) {
                    return;
                  }
                  openBox.mutate(
                    {
                      id: account?._id,
                      bulk: {
                        opening: dayjs().toDate(),
                        change: parseInt(change),
                        date: dayjs().format("YYYY-MM-DD"),
                      },
                    },
                    {
                      onSuccess: (response) => {
                        const { accessToken } = response;
                        setCreateSession(accessToken, refreshToken);
                        toast.success("Caja abierta");
                        queryClient.invalidateQueries({
                          queryKey: ["getAccount", account?._id],
                        });
                        setOpenDialog(false);
                      },
                      onError: (error) => {
                        console.log(error);
                        toast.error(
                          "Error al abrir caja, por favor intenta de nuevo"
                        );
                      },
                    }
                  );
                }}
              >
                <PanelTopClose className="mr-2 h-4 w-4" />
                Abrir caja
              </Button>
              <Button onClick={() => setCloseSession()}>
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar sesion
              </Button>
              <Button onClick={() => console.log(account)}>test</Button>
            </div>

            {/* <div className="flex justify-between items-center w-ful">
              <Button onClick={() => console.log(account)}>account</Button>
              <Button onClick={() => console.log(accountFromBd)}>
                accountBD
              </Button>
               <Button
                onClick={() => {
                  if (!account?._id) {
                    return;
                  }
                  updateAccount.mutate(
                    {
                      id: account?._id,
                      bulk: {
                        session: {
                          opening: null,
                          change: 0,
                        },
                      },
                    },
                    {
                      onSuccess: () => {
                        console.log("lesto");
                      },
                    }
                  );
                }}
              >
                setear account
              </Button>
            </div> */}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ChargesAppTemplate;
