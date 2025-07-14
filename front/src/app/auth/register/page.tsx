// front/src/app/auth/register/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "DEVELOPER",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/auth/register", form);
      router.push("/auth/login");
    } catch (err: any) {
      setError(err?.response?.data?.error || "Error en el registro");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-md">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-center">
          <h1 className="text-3xl font-bold text-white">Crea tu cuenta</h1>
          <p className="text-indigo-200 mt-1">Únete a nuestra plataforma</p>
        </div>
        
        <form 
          onSubmit={handleSubmit}
          className="p-8 space-y-6"
        >
          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-lg flex items-center gap-2">
              <span className="text-lg">⚠️</span>
              <p className="text-sm">{error}</p>
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Nombre completo</label>
              <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                <span className="text-gray-500 mr-2">👤</span>
                <input
                  type="text"
                  name="name"
                  placeholder="Tu nombre"
                  className="w-full outline-none text-gray-700"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-1">Correo electrónico</label>
              <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                <span className="text-gray-500 mr-2">📧</span>
                <input
                  type="email"
                  name="email"
                  placeholder="tu@email.com"
                  className="w-full outline-none text-gray-700"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-1">Contraseña</label>
              <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                <span className="text-gray-500 mr-2">🔒</span>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="w-full outline-none text-gray-700"
                  onChange={handleChange}
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Mínimo 8 caracteres, con mayúsculas y números</p>
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-1">Rol</label>
              <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                <span className="text-gray-500 mr-2">👔</span>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full outline-none text-gray-700 bg-white"
                >
                  <option value="DEVELOPER">Desarrollador</option>
                  <option value="MANAGER">Manager</option>
                  <option value="ADMIN">Administrador</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="terms" 
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" 
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              Acepto los <a href="#" className="text-indigo-600 hover:underline">términos y condiciones</a>
            </label>
          </div>
          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3.5 rounded-xl shadow-lg hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Registrarse
          </button>
          
          <p className="text-center text-sm text-gray-500 mt-6">
            ¿Ya tienes cuenta?{" "}
            <a href="/auth/login" className="font-medium text-indigo-600 hover:text-indigo-800 hover:underline transition">
              Inicia sesión
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
