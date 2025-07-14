// front/src/app/dashboard/projects/new/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function NewProjectPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    description: '',
    status: 'PLANNING',
    priority: 'MEDIUM',
    startDate: '',
    endDate: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post(
        'http://localhost:4000/projects',
        form,
        { withCredentials: true }
      );
      alert('Proyecto creado con éxito');
      router.push('/dashboard/projects');
    } catch (error: any) {
      console.error('Error al crear proyecto:', error);
      alert(error?.response?.data?.error || 'Error desconocido');
    }
  };

  return (
    <div className="mx-auto p-6 bg-white rounded-xl shadow-md mt-10 border border-gray-200">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Crear nuevo proyecto</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del proyecto</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-black"
            placeholder="Ingrese el nombre del proyecto"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-black"
            placeholder="Ingrese la descripción del proyecto"
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de inicio</label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de fin</label>
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-black"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-black"
            >
              <option value="PLANNING">Planeación</option>
              <option value="IN_PROGRESS">En progreso</option>
              <option value="COMPLETED">Completado</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prioridad</label>
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-black"
            >
              <option value="LOW">Baja</option>
              <option value="MEDIUM">Media</option>
              <option value="HIGH">Alta</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end pt-3">
          <button
            type="submit"
            className="bg-indigo-600 text-white font-medium py-2.5 px-6 rounded-lg hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Crear Proyecto
          </button>
        </div>
      </form>
    </div>
  );
}
