"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const publicRoutes = ["/", "/auth/login", "/auth/signup"];

    if (!storedUser && !publicRoutes.includes(path)) {
      router.push("/auth/login");
    }
  }, [path, router]);

  return children;
};

export default ProtectedRoute;
