"use client";
import { AuthProvider } from "./AuthContext";

export const AuthProviderComponent = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
