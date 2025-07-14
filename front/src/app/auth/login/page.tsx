//front/src/app/auth/login/page.tsx
"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";


export default function LoginPage() {
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(form.email, form.password);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-md">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-center">
          <h1 className="text-3xl font-bold text-white">Bienvenido de vuelta</h1>
          <p className="text-indigo-200 mt-1">Inicia sesión para continuar</p>
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
              <div className="text-right mt-1">
                <a href="#" className="text-sm text-indigo-600 hover:underline">¿Olvidaste tu contraseña?</a>
              </div>
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3.5 rounded-xl shadow-lg hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Ingresar
          </button>
          
          
          <p className="text-center text-sm text-gray-500 mt-6">
            ¿No tienes cuenta?{" "}
            <a href="/auth/register" className="font-medium text-indigo-600 hover:text-indigo-800 hover:underline transition">
              Regístrate
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
