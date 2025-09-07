import React from "react";
import { useAuth } from "../hooks/auth";
import { Navigate } from "react-router-dom"; // or use next/navigation if Next.js
import AuthProvider from "./AuthProvider";

const ProtectedLayout = ({ children }) => {
      const { user, loading } = useAuth();

      if (loading) {
            return <div className="flex items-center justify-center h-screen">Loading...</div>;
      }

      if (!user) {
            return <Navigate to="/auth/login" replace />; // redirect if not authenticated
      }

      return <AuthProvider>{children}</AuthProvider>;
};

export default ProtectedLayout;
