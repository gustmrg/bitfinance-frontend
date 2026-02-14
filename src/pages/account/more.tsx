import { ChevronRight, LogOut, Settings } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { useLogoutAction } from "@/auth/auth-provider";
import { PageContainer, PageHeader } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function AccountMore() {
  const logout = useLogoutAction();
  const navigate = useNavigate();

  const onLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <PageContainer className="max-w-2xl">
      <PageHeader
        title="More"
        description="Access account and secondary actions."
      />

      <Card>
        <CardContent className="space-y-1 p-2">
          <Button asChild variant="ghost" className="h-12 w-full justify-between px-3">
            <Link to="/account/settings">
              <span className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Account Settings
              </span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          </Button>

          <Button
            variant="ghost"
            className="h-12 w-full justify-start gap-2 px-3 text-red-600 hover:text-red-600 dark:text-red-400 dark:hover:text-red-400"
            onClick={onLogout}
          >
            <LogOut className="h-4 w-4" />
            Log out
          </Button>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
