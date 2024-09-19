import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Loader2, Lock, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCreateSessionMutation } from "@/services/hooks/auth/useAuthMutation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";
import { toast } from "sonner";
import { useAccountStore } from "@/store/useAccountStore";
import MenuButton from "../custom/Button/MenuButton";

function LoginScreen() {
  const navigate = useNavigate();
  const createSession = useCreateSessionMutation();
  const [name, setName] = useState("mañana");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setCreateSession } = useAccountStore();
  const [menu, setMenu] = useState(true)
  const [app, setApp] = useState("")



  if(menu){
    return (
      <main className="flex flex-1 items-center justify-center">
      <Card className="w-full max-w-md mt-60">
        <CardHeader className="space-y-5 items-center">
          <img src="/logoFam.png" alt="Complex Logo" className="object-cover h-20" />
          <CardTitle className="text-2xl font-semibold text-center">
            Elige una aplicacion
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-10 mt-10">
        <div className="space-y-2 w-full">
          <MenuButton
          label="Admin"
          onClick={()=> {
            setApp("admin")
            setMenu(false)
            }}
          />
        </div>
        <div className="space-y-2 w-full">
        <MenuButton
          label="Cargas Virtuales"
          onClick={()=> {
            setApp("cargas virtuales")
            setMenu(false)
            }}
          />
        </div>
        <div className="space-y-2 w-full">
        <MenuButton
          label="Pedidos"
          onClick={()=> {
            setApp("pedidos")
            setMenu(false)
            }}
          />
        </div>
        <div className="space-y-2 w-full">
        <MenuButton
          label="Pagos"
          onClick={()=> {
            setApp("pagos")
            setMenu(false)
            }}
          />
        </div>
        </CardContent>
        <CardFooter>
        </CardFooter>
      </Card>
    </main>
    )
  }

  return (
    <main className="flex flex-1 items-center justify-center">
      <Card className="w-full max-w-md mt-60">
        <div className="w-full px-2 py-2">
      <Button size="icon" variant="outline" onClick={()=> setMenu(true)} className="rounded-full">
        <ArrowLeft/>
      </Button>
        </div>
        <CardHeader className="space-y-5 items-center">
          <img src="/logoFam.png" alt="Complex Logo" className="object-cover h-20" />
          <CardTitle className="text-2xl font-semibold text-center">
            Iniciar sesión
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 mt-10">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre de usuario</Label>
            <div className="relative">
              <Select
                value={name}
                onValueChange={(e) => setName(e)}
                name="name"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un usuario" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="mañana">Mañana</SelectItem>
                    <SelectItem value="tarde">Tarde</SelectItem>
                    <SelectItem value="noche">Noche</SelectItem>
                    <SelectItem value="fernando">Admin</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">contraseña</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                id="password"
                placeholder="contraseña"
                type="password"
                className="pl-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full flex flex-col space-y-4 my-10">
            <Button
              className="w-full"
              variant="default"
              onClick={() => {
                setIsLoading(true);
                createSession.mutate(
                  { name, password },
                  {
                    onSuccess: async (response) => {
                      if (response) {
                        const { accessToken, refreshToken } = response;
                        await new Promise((resolve) =>
                          setTimeout(resolve, 4000)
                        );
                        setCreateSession(accessToken, refreshToken);
                        toast.success("Sesion iniciada");
                        setIsLoading(false);
                        if(app === "admin"){
                          navigate("/admin")
                        } else{
                          navigate("/")
                        }
                      }
                    },
                    onError: (error) => {
                      setIsLoading(false);
                      console.log(error);
                    },
                  }
                );
              }}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  Iniciar Sesion
                </>
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}

export default LoginScreen;
