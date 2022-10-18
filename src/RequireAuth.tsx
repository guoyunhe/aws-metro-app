import React, { ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

export interface RequireAuthProps {
  children: ReactElement;
}

export function RequireAuth({ children }: RequireAuthProps) {
  const { user } = useAuth();
  let location = useLocation();

  if (user === undefined) {
    return <div>Loading...</div>;
  }

  if (user === null) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}
