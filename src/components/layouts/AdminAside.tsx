import { Button } from "../ui/button";
import {
  Banknote,
  Cuboid,
  Inbox,
  LayoutDashboard,
  ListOrdered,
  PlugZap,
  Users,
} from "lucide-react";
import {} from "../ui/dropdown-menu";
import { NavLink } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";

function AdminAside({ isSidebarOpen, setIsSidebarOpen }) {
  return (
    <aside
      className={`bg-white w-64 min-h-screen p-4 hidden xl:block lg:block md:block sm:hidden`}
    >
      <div className="flex items-center mb-6">
        <img
          src="/logoFam.png"
          alt="Complex Logo"
          className="object-cover h-14"
        />
      </div>
      <nav className="space-y-5 py-5">
        <NavLink
          to="/admin/accounts"
          className={({ isActive }) =>
            isActive ? "underline underline-offset-8 text-cx-2" : ""
          }
          onClick={() => setIsSidebarOpen(false)}
        >
          {({ isActive }) => (
            <Button
              variant={isActive ? "default" : "ghost"}
              className="w-full justify-start"
            >
              <Users className="mr-2 h-4 w-4" />
              Cuentas
            </Button>
          )}
        </NavLink>
        <NavLink
          to="/admin/sales"
          className={({ isActive }) =>
            isActive ? "underline underline-offset-8 text-cx-2" : ""
          }
          onClick={() => setIsSidebarOpen(false)}
        >
          {({ isActive }) => (
            <Button
              variant={isActive ? "default" : "ghost"}
              className="w-full justify-start"
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Ventas
            </Button>
          )}
        </NavLink>
        <NavLink
          to="/admin/closes"
          className={({ isActive }) =>
            isActive ? "underline underline-offset-8 text-cx-2" : ""
          }
          onClick={() => setIsSidebarOpen(false)}
        >
          {({ isActive }) => (
            <Button
              variant={isActive ? "default" : "ghost"}
              className="w-full justify-start"
            >
              <Inbox className="mr-2 h-4 w-4" />
              Cierres
            </Button>
          )}
        </NavLink>
        <NavLink
          to="/admin/services"
          className={({ isActive }) =>
            isActive ? "underline underline-offset-8 text-cx-2" : ""
          }
          onClick={() => setIsSidebarOpen(false)}
        >
          {({ isActive }) => (
            <Button
              variant={isActive ? "default" : "ghost"}
              className="w-full justify-start"
            >
              <Cuboid className="mr-2 h-4 w-4" />
              Servicios
            </Button>
          )}
        </NavLink>
        <NavLink
          to="/admin/recharges"
          className={({ isActive }) =>
            isActive ? "underline underline-offset-8 text-cx-2" : ""
          }
          onClick={() => setIsSidebarOpen(false)}
        >
          {({ isActive }) => (
            <Button
              variant={isActive ? "default" : "ghost"}
              className="w-full justify-start"
            >
              <PlugZap className="mr-2 h-4 w-4" />
              Recargas
            </Button>
          )}
        </NavLink>
        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            isActive ? "underline underline-offset-8 text-cx-2" : ""
          }
          onClick={() => setIsSidebarOpen(false)}
        >
          {({ isActive }) => (
            <Button
              variant={isActive ? "default" : "ghost"}
              className="w-full justify-start"
            >
              <ListOrdered className="mr-2 h-4 w-4" />
              Pedidos
            </Button>
          )}
        </NavLink>
        <NavLink
          to="/admin/payments"
          className={({ isActive }) =>
            isActive ? "underline underline-offset-8 text-cx-2" : ""
          }
          onClick={() => setIsSidebarOpen(false)}
        >
          {({ isActive }) => (
            <Button
              variant={isActive ? "default" : "ghost"}
              className="w-full justify-start"
            >
              <Banknote className="mr-2 h-4 w-4" />
              Pagos
            </Button>
          )}
        </NavLink>
      </nav>
      <Sheet
        open={isSidebarOpen}
        onOpenChange={() => setIsSidebarOpen(false)}
        modal={false}
      >
        <SheetContent
          side="left"
          className="bg-white p-4 block sm:block md:hidden lg:hidden xl:hidden"
        >
          <SheetHeader>
            <SheetTitle>
              <img
                src="/logoFam.png"
                alt="Complex Logo"
                className="object-cover h-16"
              />
            </SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <NavLink
              to="/admin/accounts"
              className={({ isActive }) =>
                isActive ? "underline underline-offset-8 text-cx-2" : ""
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              {({ isActive }) => (
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className="w-full justify-start"
                >
                  <Users className="mr-2 h-4 w-4" />
                  Cuentas
                </Button>
              )}
            </NavLink>
            <NavLink
              to="/admin/sales"
              className={({ isActive }) =>
                isActive ? "underline underline-offset-8 text-cx-2" : ""
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              {({ isActive }) => (
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className="w-full justify-start"
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Ventas
                </Button>
              )}
            </NavLink>
            <NavLink
              to="/admin/closes"
              className={({ isActive }) =>
                isActive ? "underline underline-offset-8 text-cx-2" : ""
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              {({ isActive }) => (
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className="w-full justify-start"
                >
                  <Inbox className="mr-2 h-4 w-4" />
                  Cierres
                </Button>
              )}
            </NavLink>
            <NavLink
              to="/admin/services"
              className={({ isActive }) =>
                isActive ? "underline underline-offset-8 text-cx-2" : ""
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              {({ isActive }) => (
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className="w-full justify-start"
                >
                  <Cuboid className="mr-2 h-4 w-4" />
                  Servicios
                </Button>
              )}
            </NavLink>
            <NavLink
              to="/admin/recharges"
              className={({ isActive }) =>
                isActive ? "underline underline-offset-8 text-cx-2" : ""
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              {({ isActive }) => (
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className="w-full justify-start"
                >
                  <PlugZap className="mr-2 h-4 w-4" />
                  Recargas
                </Button>
              )}
            </NavLink>
            <NavLink
              to="/admin/orders"
              className={({ isActive }) =>
                isActive ? "underline underline-offset-8 text-cx-2" : ""
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              {({ isActive }) => (
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className="w-full justify-start"
                >
                  <ListOrdered className="mr-2 h-4 w-4" />
                  Pedidos
                </Button>
              )}
            </NavLink>
            <NavLink
              to="/admin/payments"
              className={({ isActive }) =>
                isActive ? "underline underline-offset-8 text-cx-2" : ""
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              {({ isActive }) => (
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className="w-full justify-start"
                >
                  <Banknote className="mr-2 h-4 w-4" />
                  Pagos
                </Button>
              )}
            </NavLink>
          </div>
        </SheetContent>
      </Sheet>
    </aside>
  );
}

export default AdminAside;
