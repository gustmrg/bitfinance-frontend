import { useLogoutAction } from "@/auth/auth-provider";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const logout = useLogoutAction();

  return (
    <Button className="flex flex-row space-x-2 gap-2 font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-sm" onClick={async () => await logout()}>
      Log Out
    </Button>
  );
}
