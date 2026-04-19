import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import Login from "../pages/Login";
import React from "react";

function Protected({ children }) {
  const { loading, user } = useAuth();
  if (loading) {
    return (
      <main>
        <h1>loading....</h1>
      </main>
    );
  }
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default Protected;
