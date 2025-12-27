"use client";
import ProtectedRoute from "./ProtextRout";

const ProtectedLayout = ({ children }) => {
  return <ProtectedRoute>{children}</ProtectedRoute>;
};

export default ProtectedLayout;
