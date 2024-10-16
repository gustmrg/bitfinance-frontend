import { useAuth } from "@/auth/auth-provider";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const { logout } = useAuth();

  return (
    <Button className="flex flex-row space-x-2 gap-2 font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-sm" onClick={logout}>
      Log Out
    </Button>
  );
}
