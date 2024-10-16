import Footer from "./components/footer";
import { LoginButton } from "./components/login-button";
import { CTAButton } from "./components/cta-button";
import { LogoutButton } from "./components/logout-button";
import { GoToDashboardButton } from "./components/dashboard-button";
import { useAuth } from "@/auth/auth-provider";

export function Home() {
  const { user, isAuthenticated } = useAuth();

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
                src="/assets/logo.png"
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
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-balance text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Manage your finances simply and smartly
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Discover an easy way to manage your expenses, track your spending,
              and plan for your financial future. With our app, you have all the
              tools to monitor your accounts, set goals, and make confident
              financial decisions. Simplicity, security, and efficiency for your
              money, all in one place.
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
