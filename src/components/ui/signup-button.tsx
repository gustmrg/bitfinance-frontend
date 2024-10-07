import { Button } from "./button";

const SignUpButton = () => {
  return (
    <a href="api/auth/signup">
      <Button className="rounded-md bg-sky-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500">
        Get started
      </Button>
    </a>
  );
};

export default SignUpButton;
