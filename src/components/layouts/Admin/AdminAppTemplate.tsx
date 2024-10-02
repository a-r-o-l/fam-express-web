import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../Header";
import { useAccountStore } from "@/store/useAccountStore";
import AdminAside from "./AdminAside";

function ChargesAppTemplate() {
  const { account, setCreateSession, accessToken, refreshToken } =
    useAccountStore();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
      if (account?.role !== "admin") {
        navigate("/login");
      }
    }
  }, [account, accessToken, setCreateSession, navigate, refreshToken]);

  return (
    <div className="flex h-screen">
      <AdminAside
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default ChargesAppTemplate;
