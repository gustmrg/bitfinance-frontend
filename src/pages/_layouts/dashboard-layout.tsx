import { Outlet } from "react-router-dom";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";

export function DashboardLayout() {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-neutral-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
