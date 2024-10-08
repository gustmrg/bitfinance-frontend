import { Button } from "./button";

const LoginButton = () => {
  return (
    <a href="/api/auth/login">
      <Button
        className="flex flex-row space-x-2 gap-2 font-semibold"
        color="blue"
      >
        Log In
      </Button>
    </a>
  );
};

export default LoginButton;
