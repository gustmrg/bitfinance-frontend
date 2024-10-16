import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function GoToDashboardButton() {
  return (
    <NavLink to="/dashboard">
      <Button
        variant="outline"
        className="flex flex-row space-x-2 gap-2 font-semibold shadow-sm"
      >
        Go To Dashboard
      </Button>
    </NavLink>
  );
}
