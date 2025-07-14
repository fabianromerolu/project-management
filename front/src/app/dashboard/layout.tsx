// front/src/app/dashboard/layout.tsx
'use client';
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Proyectos", href: "/dashboard/projects" },
  { label: "Tareas", href: "/dashboard/tasks" },
  { label: "Usuarios", href: "/dashboard/users" },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  return (
  <div className="min-h-screen flex bg-gradient-to-b from-gray-50 to-gray-100">
    {/* Sidebar */}
    <aside className="w-64 bg-gradient-to-b from-indigo-700 to-indigo-800 text-white hidden md:flex flex-col p-5 shadow-xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-1">Panel de Control</h2>
      </div>
      
      <nav className="flex flex-col gap-1 flex-grow">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`px-4 py-3 rounded-lg flex items-center gap-3 transition-all ${
              pathname === item.href 
                ? "bg-white text-indigo-700 font-medium shadow-md"
                : "text-indigo-100 hover:bg-indigo-600"
            }`}
          >
            <span>📋</span>
            <span>{item.label}</span>
          </Link>
        ))}
        
        {/* Botón de cerrar sesión en posición específica */}
        <button
          onClick={logout}
          className="mt-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 px-4 py-3 rounded-lg text-white font-medium transition-all shadow-md hover:shadow-lg flex items-center gap-2"
        >
          <span>🚪</span>
          <span>Cerrar sesión</span>
        </button>
      </nav>
    </aside>

    {/* Main Content */}
    <main className="flex-1 p-5 w-full">
      <div className="md:hidden mb-6 bg-white rounded-xl shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">
          Bienvenido {user?.name}
        </h1>
        <button className="text-indigo-700">
          <span className="text-2xl">☰</span>
        </button>
      </div>
      
      <div className="bg-white rounded-2xl shadow-md p-6">
        <ProtectedRoute>{children}</ProtectedRoute>
      </div>
    </main>
  </div>
  );
}
