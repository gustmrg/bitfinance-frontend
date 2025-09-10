import { CircleDollarSign } from "lucide-react";
import { useTranslation } from "react-i18next";
import { NavLink, Outlet } from "react-router-dom";
import { Toaster } from "sonner";

import securitySvg from "/assets/undraw_security_on_re_e491.svg";

export function AuthLayout() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen grid grid-cols-2 antialiased">
      <div className="h-full border-r border-foreground/5 bg-muted p-10 text-muted-foreground flex flex-col justify-between">
        <NavLink
          to="/"
          className="flex items-center gap-3 text-lg font-medium text-foreground"
        >
          <CircleDollarSign className="h-5 w-5" />
          <span className="font-semibold">BitFinance</span>
        </NavLink>
        <div className="flex items-center justify-center">
          <img src={securitySvg} alt="" width="60%" />
        </div>
        <footer className="text-sm">
          &copy; BitFinance {new Date().getFullYear()} -{" "}
          {t("footer.developedBy")}{" "}
          <a href="https://github.com/gustmrg" target="_blank">
            Gustavo Miranda
          </a>
          .
        </footer>
      </div>
      <div className="items-center justify-center relative">
        <Outlet />
        <Toaster richColors />
      </div>
    </div>
  );
}
