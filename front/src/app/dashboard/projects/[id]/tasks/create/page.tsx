//front/src/app/dashboard/projects/[id]/tasks/create/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';

export default function CreateTaskPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('LOW');
  const [status, setStatus] = useState('TODO');
  const [dueDate, setDueDate] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [estimatedHours, setEstimatedHours] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post(`http://localhost:4000/projects/${id}/tasks`, {
        title,
        description,
        priority,
        status,
        dueDate,
        assignedTo,
        estimatedHours,
      }, {
        withCredentials: true,
      });

      router.push(`/dashboard/projects/${id}`);
    } catch (error) {
      console.error('Error al crear la tarea:', error);
      alert('No se pudo crear la tarea');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-xl border border-gray-200">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Crear Nueva Tarea</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Título</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 text-black"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Descripción</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 text-black"
            rows={4}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-1">Prioridad</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 text-black"
            >
              <option value="LOW">Baja</option>
              <option value="MEDIUM">Media</option>
              <option value="HIGH">Alta</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-1">Estado</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 text-black"
            >
              <option value="TODO">Pendiente</option>
              <option value="IN_PROGRESS">En progreso</option>
              <option value="REVIEW">Revisión</option>
              <option value="DONE">Completada</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-1">Fecha de entrega</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 text-black"
            />
          </div>

          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-1">Horas estimadas</label>
            <input
              type="number"
              min="1"
              value={estimatedHours}
              onChange={(e) => setEstimatedHours(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg p-2 text-black"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Asignado a (UUID del usuario)</label>
          <input
            type="text"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 text-black"
            required
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-indigo-600 text-white font-medium px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition"
          >
            Crear Tarea
          </button>
        </div>
      </form>
    </div>
  );
}
