import { Button } from "./button";

const LogoutButton = () => {
  return (
    <a href="/api/auth/logout">
      <Button className="flex flex-row space-x-2 gap-2 font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-sm">
        Log Out
      </Button>
    </a>
  );
};

export default LogoutButton;
