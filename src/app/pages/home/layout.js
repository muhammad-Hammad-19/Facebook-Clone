"use client";

import ProtectedRoute from "../../ProtextRout";

const HomeLayout = ({ children }) => {
  return <ProtectedRoute>{children}</ProtectedRoute>;
};

export default HomeLayout;
