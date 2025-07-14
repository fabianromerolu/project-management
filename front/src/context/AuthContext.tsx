//front/src/context/AuthContext.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

// Configurar axios para enviar cookies con las solicitudes
axios.defaults.withCredentials = true;


interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  login: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    axios.get("http://localhost:4000/auth/profile", {
      withCredentials: true,
    })
      .then((res) => setUser(res.data))
      .catch((err) => {
        if (err.response?.status === 401) {
          console.log("No hay sesión activa");
          setUser(null);
        } else {
          console.error("Error al obtener el perfil:", err);
        }
      });
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await axios.post("http://localhost:4000/auth/login", {
        email,
        password
      }, { withCredentials: true });

      await new Promise((res) => setTimeout(res, 200));

      const res = await axios.get("http://localhost:4000/auth/profile", {
        withCredentials: true,
      });

      setUser(res.data);
      router.push("/dashboard/projects");
    } catch (error: any) {
      throw new Error(error?.response?.data?.error || "Credenciales incorrectas");
    }
  };

  const logout = async () => {
    try {
      await axios.post("http://localhost:4000/auth/logout", {}, {
        withCredentials: true,
      });
      setUser(null);
      router.push("/auth/login");
    } catch (err) {
      console.error("Error al cerrar sesión", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
