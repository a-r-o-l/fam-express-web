import { Button } from "./ui/button";
import { useTheme } from "./ThemeProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Bell,
  Bus,
  ChevronDown,
  CreditCard,
  Layers,
  LayoutDashboard,
  LogOut,
  Moon,
  Settings,
  Sun,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { servicesApiService } from "../services/servicesApiService";
import { PartialServiceInt } from "@/types/ServiceTypes";


function App() {
  const { setTheme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedService, setSelectedService] = useState("sirve");
  

  const [services, setServices] = useState<PartialServiceInt[] | []>([]);

  const [value, setValue] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      const response = await servicesApiService.getServices();
      setServices(response);
    };
    fetchServices();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <aside
        className={`bg-white w-64 min-h-screen p-4 ${
          isSidebarOpen ? "" : "hidden"
        }`}
      >
        <div className="flex items-center mb-6">
          <Layers className="h-6 w-6 text-primary mr-2" />
          <span className="text-xl font-bold">SaaSCo</span>
        </div>
        <nav className="space-y-2">
          <Button variant="ghost" className="w-full justify-start">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Users className="mr-2 h-4 w-4" />
            Users
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <CreditCard className="mr-2 h-4 w-4" />
            Billing
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => console.log(services)}
          >
            <Settings className="mr-2 h-4 w-4" />
            test
          </Button>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <Button
              variant="destructive"
              size="sm"
              className="md:hidden"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Layers className="h-6 w-6" />
            </Button>
            <h1 className="text-lg font-semibold">Dashboard</h1>
            <div className="flex items-center">
              <Button variant="ghost" size="sm" className="mr-2">
                <Bell className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center"
                  >
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage
                        src="/placeholder.svg?height=32&width=32"
                        alt="User"
                      />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <span className="mr-2">John Doe</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3">
              {services?.length ? (
                services.map((ser) => {
                  return (
                    <Card key={ser._id}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          {(ser.name ?? "").toUpperCase()}
                        </CardTitle>
                        <Bus className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">$ {ser.amount}</div>
                      </CardContent>
                    </Card>
                  );
                })
              ) : (
                <></>
              )}
            </div>
            <div className="grid gap-6 mb-8 md:grid-cols-1">
              <Card>
                <CardHeader>
                  <CardTitle>Nueva Venta</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-center justify-evenly text-muted-foreground gap-10 px-10">
                  {services?.length ? 
                  services.map((service)=>(
                    <div
                    key={service._id}
                      className={`flex flex-col w-full cursor-pointer hover:scale-105 transition-transform ${
                        selectedService !== service.name ? "opacity-20" : ""
                      }`}
                      onClick={() => setSelectedService(service.name)}
                    >
                      <Card>
                        <CardHeader>
                          <CardTitle>{(service?.name ?? "").toUpperCase()}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">
                            <Input
                              placeholder="monto"
                              value={value}
                              onChange={(e) =>
                                setValue(e.target.value)
                              }
                            />
                            <div className="flex w-full justify-end gap-10 my-5">
                              <Button variant="outline">Limpiar</Button>
                              <Button
                                variant="default"
                              >
                                Enviar
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )) 
                  : 
                  (<></>)}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Ventas recientes</CardTitle>
                <CardDescription>You have 3 new notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center">
                      <Avatar className="h-9 w-9">
                        <AvatarImage
                          src={`/placeholder.svg?height=36&width=36`}
                          alt="Avatar"
                        />
                        <AvatarFallback>OM</AvatarFallback>
                      </Avatar>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          Olivia Martin
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Subscribed to the Pro Plan
                        </p>
                      </div>
                      <div className="ml-auto font-medium">Just now</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
