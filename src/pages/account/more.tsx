import {
  BarChart3,
  Bell,
  Building2,
  CreditCard,
  type LucideIcon,
  Link2,
  LogOut,
  ReceiptText,
  Settings,
  Wallet,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { useLogoutAction } from "@/auth/auth-provider";
import { PageContainer, PageHeader } from "@/components/page-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MoreCardItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  type: "route" | "action" | "coming-soon";
  to?: string;
  onClick?: () => Promise<void> | void;
}

function MoreCard({ item }: { item: MoreCardItem }) {
  const Icon = item.icon;

  const content = (
    <Card
      className={cn(
        "h-full border-zinc-200",
        item.type === "coming-soon" ? "opacity-70" : "transition-colors hover:bg-muted/30"
      )}
    >
      <CardContent className="flex h-full flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <span
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-md",
              item.type === "action" ? "bg-red-100 text-red-700" : "bg-zinc-100 text-zinc-700"
            )}
          >
            <Icon className="h-5 w-5" />
          </span>
          {item.type === "coming-soon" ? (
            <Badge variant="secondary" className="text-[10px]">
              Coming soon
            </Badge>
          ) : null}
        </div>

        <div className="mt-3 space-y-1 text-left">
          <p
            className={cn(
              "text-sm font-semibold leading-5",
              item.type === "action" ? "text-red-700" : "text-foreground"
            )}
          >
            {item.title}
          </p>
          <p className="text-xs text-muted-foreground">{item.description}</p>
        </div>
      </CardContent>
    </Card>
  );

  if (item.type === "route" && item.to) {
    return (
      <Link
        to={item.to}
        className="block h-full rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        {content}
      </Link>
    );
  }

  if (item.type === "action" && item.onClick) {
    return (
      <button
        type="button"
        onClick={item.onClick}
        className="block h-full rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        {content}
      </button>
    );
  }

  return (
    <div
      aria-disabled="true"
      className="block h-full cursor-not-allowed rounded-lg"
    >
      {content}
    </div>
  );
}

export function AccountMore() {
  const logout = useLogoutAction();
  const navigate = useNavigate();

  const onLogout = async () => {
    await logout();
    navigate("/");
  };

  const items: MoreCardItem[] = [
    {
      id: "account-settings",
      title: "Account Settings",
      description: "Profile and account preferences.",
      icon: Settings,
      type: "route",
      to: "/account/settings",
    },
    {
      id: "bills",
      title: "Bills",
      description: "Manage recurring bills and due dates.",
      icon: ReceiptText,
      type: "route",
      to: "/dashboard/bills",
    },
    {
      id: "expenses",
      title: "Expenses",
      description: "Track day-to-day expense records.",
      icon: CreditCard,
      type: "route",
      to: "/dashboard/expenses",
    },
    {
      id: "create-organization",
      title: "Create Organization",
      description: "Set up a new organization workspace.",
      icon: Building2,
      type: "route",
      to: "/account/create-organization",
    },
    {
      id: "reports",
      title: "Reports",
      description: "View financial insights and summaries.",
      icon: BarChart3,
      type: "coming-soon",
    },
    {
      id: "budgets",
      title: "Budgets",
      description: "Plan monthly budgets and spending limits.",
      icon: Wallet,
      type: "coming-soon",
    },
    {
      id: "notifications",
      title: "Notifications",
      description: "Configure reminders and alert rules.",
      icon: Bell,
      type: "coming-soon",
    },
    {
      id: "integrations",
      title: "Integrations",
      description: "Connect external tools and services.",
      icon: Link2,
      type: "coming-soon",
    },
    {
      id: "logout",
      title: "Log out",
      description: "Sign out from this device.",
      icon: LogOut,
      type: "action",
      onClick: onLogout,
    },
  ];

  return (
    <PageContainer className="max-w-3xl">
      <PageHeader
        title="More"
        description="Access settings, account tools, and upcoming features."
      />

      <div className="grid grid-cols-2 gap-3">
        {items.map((item) => (
          <MoreCard key={item.id} item={item} />
        ))}
      </div>
    </PageContainer>
  );
}
