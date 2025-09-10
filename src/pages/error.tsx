import { Link } from "@tanstack/react-router";

export function Error() {
  const error = { message: "An unexpected error occurred" };

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold">Ops, algo aconteceu...</h1>
      <p className="text-accent-foreground">
        An unexpected error has occurred. Find more details below:
      </p>
      <pre>{error?.message || JSON.stringify(error)}</pre>
      <p className="text-accent-foreground">
        Go Back to
        <Link to="/" className="text-sky-500 dark:text-sky-400">
          Home
        </Link>
      </p>
    </div>
  );
}
