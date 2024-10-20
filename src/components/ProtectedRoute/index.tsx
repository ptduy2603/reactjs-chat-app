// customize a protected route from original route to check if user authenticated and redirect
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  redirectPath: string;
  isSafe: boolean;
};

function ProtectedRoute({ redirectPath, children, isSafe }: Props) {
  return <>{isSafe ? children : <Navigate to={redirectPath} />}</>;
}

export default ProtectedRoute;
