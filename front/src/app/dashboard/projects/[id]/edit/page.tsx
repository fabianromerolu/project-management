// front/src/app/dashboard/projects/[id]/edit/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [form, setForm] = useState({
    name: '',
    description: '',
    status: 'PLANNING',
    priority: 'MEDIUM',
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/projects/${id}`, { withCredentials: true });
        const project = response.data;
        setForm({
          name: project.name,
          description: project.description || '',
          status: project.status,
          priority: project.priority,
          startDate: project.startDate.slice(0, 10),
          endDate: project.endDate.slice(0, 10),
        });
      } catch (error) {
        console.error('Error al obtener proyecto:', error);
        alert('Error al cargar el proyecto');
        router.push('/dashboard/projects');
      }
    };

    fetchProject();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:4000/projects/${id}`,
        form,
        { withCredentials: true }
      );
      alert('Proyecto actualizado con éxito');
      router.push('/dashboard/projects');
    } catch (error: any) {
      console.error('Error al actualizar proyecto:', error);
      alert(error?.response?.data?.error || 'Error al actualizar proyecto');
    }
  };

  return (
    <div className="mx-auto p-6 bg-white rounded-xl shadow-md mt-10 border border-gray-200">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Editar proyecto</h1>

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
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-black"
          />
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
              <option value="CANCELLED">Cancelado</option>
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
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
}
