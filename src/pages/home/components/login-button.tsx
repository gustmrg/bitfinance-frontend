import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export function LoginButton() {
  return (
    <Link to="/auth/sign-in">
      <Button className="flex flex-row space-x-2 gap-2 font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-sm">
        Log In
      </Button>
    </Link>
  );
}
