// src/components/ProtectedRoute.tsx
"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push("/auth/login");
    }
  }, [user, router]);

  // Mientras validamos si hay user, podemos mostrar un loader o nada
  if (user === null) {
    return <p className="text-center mt-20">Cargando...</p>;
  }

  return <>{children}</>;
}
