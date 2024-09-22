import { Bell, Menu } from "lucide-react";
import { Button } from "./button";
import UserNav from "./user-nav";
import { ModeToggle } from "./mode-toggle";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="md:hidden mr-2">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
