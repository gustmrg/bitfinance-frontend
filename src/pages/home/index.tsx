import { useAuth } from "@/auth/auth-provider";
import { useTranslation } from "react-i18next";
import { CTAButton } from "./components/cta-button";
import { GoToDashboardButton } from "./components/dashboard-button";
import Footer from "./components/footer";
import { LoginButton } from "./components/login-button";
import { LogoutButton } from "./components/logout-button";

import logoImg from "/assets/logo.png";

export function Home() {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-6 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">BitFinance</span>
              <img
                alt="BitFinance logo"
                src={logoImg}
                className="h-16 w-auto"
              />
            </a>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {!isAuthenticated ? <LoginButton /> : null}
            {isAuthenticated ? (
              <div className="flex flex-row space-x-2">
                <GoToDashboardButton />
                <LogoutButton />
              </div>
            ) : null}
          </div>
        </nav>
      </header>
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-3xl py-32 sm:py-48 lg:py-56">
          <div>
            <h1 className="text-balance text-4xl text-center font-bold tracking-tight text-gray-900 sm:text-6xl">
              {t("home.title")}
            </h1>
            <p className="mt-6 text-lg text-center leading-8 text-gray-600">
              {t("home.subtitle")}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <CTAButton />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
