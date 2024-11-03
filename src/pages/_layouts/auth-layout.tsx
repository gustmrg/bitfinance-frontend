import { CircleDollarSign } from "lucide-react";
import { Outlet } from "react-router-dom";
import securitySvg from "/assets/undraw_security_on_re_e491.svg";

export function AuthLayout() {
  return (
    <div className="min-h-screen grid grid-cols-2 antialiased">
      <div className="h-full border-r border-foreground/5 bg-muted p-10 text-muted-foreground flex flex-col justify-between">
        <div className="flex items-center gap-3 text-lg font-medium text-foreground">
          <CircleDollarSign className="h-5 w-5" />
          <span className="font-semibold">BitFinance</span>
        </div>
        <div className="flex items-center justify-center">
          <img src={securitySvg} alt="" width="60%" />
        </div>
        <footer className="text-sm">
          &copy; BitFinance {new Date().getFullYear()} - Developed and
          maintained by{" "}
          <a href="https://github.com/gustmrg" target="_blank">
            Gustavo Miranda
          </a>
          .
        </footer>
      </div>
      <div className="items-center justify-center relative">
        <Outlet />
      </div>
    </div>
  );
}
