import { Button } from "./button";

const SignUpButton = () => {
  return (
    <a href="api/auth/signup">
      <Button className="flex flex-row space-x-2 gap-2 font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-sm">
        Get started
      </Button>
    </a>
  );
};

export default SignUpButton;
