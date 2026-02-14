import {
  useAuthInitialization,
  useCurrentUser,
  useIsAuthenticated,
} from "@/auth/auth-provider";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isInitialized = useAuthInitialization();
  const isAuthenticated = useIsAuthenticated();
  const currentUserQuery = useCurrentUser();
  const location = useLocation();
  const isLoading =
    !isInitialized || (isAuthenticated && currentUserQuery.isPending);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate 
        to={`/auth/sign-in?returnUrl=${encodeURIComponent(location.pathname)}`}
        replace 
      />
    );
  }

  return <>{children}</>;
}
