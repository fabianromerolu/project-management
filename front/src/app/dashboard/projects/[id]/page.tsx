// front/src/app/dashboard/projects/[id]/page.tsx
// front/src/app/dashboard/projects/[id]/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ViewProjectPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    const fetchProjectAndTasks = async () => {
      try {
        const [projectRes, tasksRes] = await Promise.all([
          axios.get(`http://localhost:4000/projects/${id}`, {
            withCredentials: true,
          }),
          axios.get(`http://localhost:4000/projects/${id}/tasks`, {
            withCredentials: true,
          }),
        ]);

        setProject(projectRes.data);
        setTasks(tasksRes.data);
      } catch (error) {
        console.error('Error al cargar el proyecto o tareas:', error);
        alert('Error al cargar datos del proyecto');
        router.push('/dashboard/projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjectAndTasks();
  }, [id]);

  if (loading) return <p className="p-6">Cargando...</p>;
  if (!project) return <p className="p-6 text-red-600">Proyecto no encontrado</p>;

  return (
<div className="mx-auto p-8 bg-white rounded-xl shadow-lg mt-10 border border-gray-200 max-w-4x2">
  <div className="flex justify-between items-start mb-8">
    <div>
      <h1 className="text-3xl font-bold text-gray-800">{project.name}</h1>
      <div className="flex items-center gap-3 mt-2">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          project.status === 'COMPLETED' 
            ? 'bg-green-100 text-green-800' 
            : project.status === 'IN_PROGRESS' 
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-blue-100 text-blue-800'
        }`}>
          {project.status === 'COMPLETED' ? 'Completado' : 
           project.status === 'IN_PROGRESS' ? 'En progreso' : 'Planeación'}
        </span>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          project.priority === 'Alta' 
            ? 'bg-red-100 text-red-800' 
            : project.priority === 'Media' 
              ? 'bg-orange-100 text-orange-800'
              : 'bg-gray-100 text-gray-800'
        }`}>
          {project.priority}
        </span>
      </div>
    </div>
    <button
      onClick={() => router.push(`/dashboard/projects/${project.id}/edit`)}
      className="bg-indigo-600 text-white font-medium py-2.5 px-5 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
      </svg>
      Editar proyecto
    </button>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
    <div className="border border-gray-200 rounded-lg p-5">
      <h2 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">Información del Proyecto</h2>
      
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500 mb-1">Descripción</p>
          <p className="text-gray-700">{project.description || 'No se ha proporcionado descripción'}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-500 mb-1">Manager</p>
          <p className="text-gray-700 font-medium">{project.manager?.name || 'No asignado'}</p>
        </div>
      </div>
    </div>
    
    <div className="border border-gray-200 rounded-lg p-5">
      <h2 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">Fechas</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500 mb-1">Fecha de inicio</p>
          <p className="text-gray-700">
            {project.startDate ? new Date(project.startDate).toLocaleDateString() : 'No especificada'}
          </p>
        </div>
        
        <div>
          <p className="text-sm text-gray-500 mb-1">Fecha de fin</p>
          <p className="text-gray-700">
            {project.endDate ? new Date(project.endDate).toLocaleDateString() : 'No especificada'}
          </p>
        </div>
      </div>
    </div>
  </div>

  <div className="border border-gray-200 rounded-lg p-5 mb-8">
    <h2 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">Equipo</h2>
    
    {project.developers?.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {project.developers.map((dev: any) => (
          <div key={dev.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
            <div>
              <p className="font-medium text-gray-800">{dev.name}</p>
              <p className="text-sm text-gray-500">Desarrollador</p>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center py-8 text-gray-500">
        No hay desarrolladores asignados a este proyecto
      </div>
    )}
  </div>

  <div className="border border-gray-200 rounded-lg p-5 mb-8">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold text-gray-700">Tareas del Proyecto</h2>
      <button
        onClick={() => router.push(`/dashboard/projects/${project.id}/tasks/create`)}
        className="text-sm text-white bg-green-600 px-4 py-2 rounded hover:bg-green-700"
      >
        + Nueva tarea
      </button>
    </div>

    {tasks.length > 0 ? (
      <div className="space-y-4">
        {tasks.map((task) => (
        <div key={task.id} className="p-4 border rounded-lg bg-gray-50 flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-gray-800">{task.title}</h3>
            <p className="text-sm text-gray-600">{task.description || 'Sin descripción'}</p>
            <p className="text-sm mt-1 text-gray-500">
              Estado: <span className="font-medium">{task.status}</span> | Prioridad: <span className="font-medium">{task.priority}</span>
            </p>
            <p className="text-sm text-gray-500">Entrega: {new Date(task.dueDate).toLocaleDateString()}</p>
            {task.assignedUser?.name && (
              <p className="text-sm text-gray-500">Asignado a: <span className="font-medium">{task.assignedUser.name}</span></p>
            )}
          </div>

          <div className="flex flex-col gap-2 ml-4">
            <button
              onClick={() => router.push(`/dashboard/tasks/${task.id}/edit`)}
              className="text-sm text-blue-600 hover:underline"
            >
              Editar
            </button>
            <button
              onClick={async () => {
                const confirm = window.confirm('¿Estás seguro de eliminar esta tarea?');
                if (!confirm) return;

                try {
                  await axios.delete(`http://localhost:4000/projects/${id}/tasks/${task.id}`, {
                    withCredentials: true,
                  });
                  setTasks(prev => prev.filter(t => t.id !== task.id));
                } catch (err) {
                  console.error('Error al eliminar tarea:', err);
                  alert('No se pudo eliminar la tarea');
                }
              }}
              className="text-sm text-red-600 hover:underline"
            >
              Eliminar
            </button>
          </div>
        </div>
        ))}
      </div>
    ) : (
      <div className="text-center py-6 text-gray-500">
        No hay tareas asociadas a este proyecto
      </div>
    )}
  </div>

  <div className="flex justify-end">
    <button
      onClick={() => router.push('/dashboard/projects')}
      className="text-gray-600 hover:text-gray-800 font-medium flex items-center gap-2 transition"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
      </svg>
      Volver a proyectos
    </button>
  </div>
</div>
  );
}
