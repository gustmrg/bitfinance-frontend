import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function GoToDashboardButton() {
  return (
    <Link to="/dashboard">
      <Button
        variant="outline"
        className="flex flex-row space-x-2 gap-2 font-semibold shadow-sm"
      >
        Go To Dashboard
      </Button>
    </Link>
  );
}
