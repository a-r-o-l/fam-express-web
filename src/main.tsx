import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from './components/ThemeProvider'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginScreen from './components/pages/LoginScreen';
import ChargesAppTemplate from './components/layouts/ChargesAppTemplate';
import AdminAppTemplate from './components/layouts/AdminAppTemplate';
import SaleScreen from './components/pages/SaleScreen';
import AdminRechargePage from './components/pages/Admin/AdminRechargePage';
import { Toaster } from "sonner";
import AdminPage from './components/pages/Admin/AdminPage';
import AdminAccountsPage from './components/pages/Admin/AdminAccounts/AdminAccountsPage';
import AdminSalesPage from './components/pages/Admin/AdminSales/AdminSalesPage';
import AdminServicesPage from './components/pages/Admin/AdminService/AdminServicesPage';
import AdminCashClosingPage from './components/pages/Admin/AdminCashClosing/AdminCashClosingPage';
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";

dayjs.extend(relativeTime);
dayjs.locale("es");

const queryClient = new QueryClient();


const router = createBrowserRouter([
  {
    path: "/",
    element: <ChargesAppTemplate/>,
    children: [
      {
        index: true,
        element: <SaleScreen/>,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminAppTemplate/>,
    children: [
      {
        index: true,
        element: <AdminPage />,
      },
      {
        path: "/admin/accounts",
        element: <AdminAccountsPage />,
      },
      {
        path: "/admin/sales",
        element: <AdminSalesPage />,
      },
      {
        path: "/admin/services",
        element: <AdminServicesPage />,
      },
      {
        path: "/admin/recharges",
        element: <AdminRechargePage />,
      },
      {
        path: "/admin/closes",
        element: <AdminCashClosingPage />,
      },
      
    ],
  },
  {
    path: "/login",
    element: <LoginScreen/>,
  },
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <Toaster richColors visibleToasts={1} />
    </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
)
