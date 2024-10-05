import { LogOut } from "lucide-react";
import { Button } from "./button";

const LogoutButton = () => {
  return (
    <a
      href="/api/auth/logout"
      className="text-sm font-semibold leading-6 text-gray-900"
    >
      <Button className="flex flex-row space-x-2 gap-2 bg-sky-600 text-white hover:bg-sky-500 focus-visible:outline-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 shadow-sm font-semibold">
        Log Out{" "}
        <span>
          <LogOut className="h-6 w-6" />
        </span>
      </Button>
    </a>
  );
};

export default LogoutButton;
