import Footer from "./components/footer";
import { LoginButton } from "./components/login-button";
import { CTAButton } from "./components/cta-button";
import { LogoutButton } from "./components/logout-button";
import { GoToDashboardButton } from "./components/dashboard-button";
import { useAuth } from "@/auth/auth-provider";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Shield, CreditCard, BarChart3, Users, DollarSign, FileText } from "lucide-react";
import { NavLink } from "react-router-dom";

import logoImg from "/assets/logo.png";

export function Home() {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
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

      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-400 to-indigo-600 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>
        
        <div className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <Badge variant="secondary" className="mb-8 px-4 py-2 text-sm">
              ✨ Now with enhanced security features
            </Badge>
            <h1 className="text-balance text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
              {t("home.title")}
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-600 max-w-2xl mx-auto">
              {t("home.subtitle")}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-4">
              <CTAButton />
              <NavLink to="/auth/sign-in">
                <Button variant="outline" size="lg" className="px-8">
                  {t("home.ctaSecondary")}
                </Button>
              </NavLink>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
          <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-indigo-400 to-blue-600 opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t("home.features.title")}
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              {t("home.features.subtitle")}
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-6xl grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">{t("home.features.expenseTracking.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  {t("home.features.expenseTracking.description")}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">{t("home.features.billManagement.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  {t("home.features.billManagement.description")}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg">{t("home.features.financialInsights.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  {t("home.features.financialInsights.description")}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle className="text-lg">{t("home.features.secureData.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  {t("home.features.secureData.description")}
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-24 bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t("home.benefits.title")}
            </h2>
          </div>
          <div className="mx-auto mt-16 max-w-4xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-blue-400" />
                </div>
                <div className="text-4xl font-bold text-white">{t("home.benefits.stats.users")}</div>
                <div className="text-lg text-gray-300 mt-2">{t("home.benefits.stats.usersLabel")}</div>
              </div>
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                  <CreditCard className="h-8 w-8 text-green-400" />
                </div>
                <div className="text-4xl font-bold text-white">{t("home.benefits.stats.billsTracked")}</div>
                <div className="text-lg text-gray-300 mt-2">{t("home.benefits.stats.billsLabel")}</div>
              </div>
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-4">
                  <DollarSign className="h-8 w-8 text-purple-400" />
                </div>
                <div className="text-4xl font-bold text-white">{t("home.benefits.stats.moneySaved")}</div>
                <div className="text-lg text-gray-300 mt-2">{t("home.benefits.stats.moneySavedLabel")}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
