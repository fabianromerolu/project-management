// front/src/app/dashboard/projects/page.tsx
'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';


type Project = {
  id: string;
  name: string;
  status: string;
  priority: string;
  startDate: string;
  endDate: string;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("http://localhost:4000/projects", {
          withCredentials: true, // importante
        });

        console.log("Respuesta de /projects:", res.data); // 🔍
        setProjects(res.data.data); // ✅ ¡Aquí sí están los proyectos!
      } catch (err) {
        console.error("Error al cargar proyectos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

const handleDelete = async () => {
  if (!selectedProjectId) return;

  try {
    await axios.delete(`http://localhost:4000/projects/${selectedProjectId}`, {
      withCredentials: true,
    });
    setProjects((prev) => prev.filter((p) => p.id !== selectedProjectId));
  } catch (error) {
    console.error("Error al eliminar proyecto:", error);
    alert("Hubo un problema al eliminar el proyecto.");
  } finally {
    setShowModal(false);
    setSelectedProjectId(null);
  }
};


  const confirmDelete = (projectId: string) => {
    setSelectedProjectId(projectId);
    setShowModal(true);
  };


  return (
  <div className="p-6 max-w-7xl mx-auto">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Listado de Proyectos
        </h1>
        <p className="text-gray-500 mt-1 max-w-xl">
          Gestiona todos tus proyectos en un solo lugar. Crea, edita y elimina proyectos según tus necesidades.
        </p>
      </div>
      <Link
        href="/dashboard/projects/new"
        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 flex items-center justify-center gap-2 font-medium"
      >
        <span className="text-lg">+</span>
        <span>Crear nuevo proyecto</span>
      </Link>
    </div>

    {loading ? (
      <div className="flex flex-col items-center justify-center mt-24">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-indigo-600 rounded-full w-8 h-8"></div>
        </div>
        <p className='text-lg text-gray-600 mt-6 font-medium animate-pulse'>Cargando proyectos...</p>
      </div>
    ) : projects.length === 0 ? (
      <div className="flex flex-col items-center justify-center mt-24 bg-gradient-to-br from-gray-50 to-indigo-50 rounded-2xl py-16 border-2 border-dashed border-indigo-200 max-w-3xl mx-auto">
        <div className="bg-indigo-100 rounded-full p-6 mb-6">
          <div className="text-4xl text-indigo-600">📂</div>
        </div>
        <p className='text-2xl text-gray-700 mb-3 font-bold'>No hay proyectos registrados</p>
        <p className="text-gray-500 max-w-md text-center mb-6">
          Comienza creando tu primer proyecto para organizar tus tareas
        </p>
        <Link
          href="/dashboard/projects/new"
          className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition duration-200 shadow-md"
        >
          Crear mi primer proyecto
        </Link>
      </div>
    ) : (
      <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-xl">
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-100 p-2 rounded-lg">
              <span className="text-indigo-600">📋</span>
            </div>
            <h2 className="text-lg font-semibold text-gray-700">Proyectos activos</h2>
          </div>
          <div className="text-sm text-gray-500">
            Total: <span className="font-medium text-indigo-600">{projects.length}</span> proyectos
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-indigo-100 to-purple-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider rounded-tl-xl">Nombre</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider">Prioridad</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider">Inicio</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider">Fin</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider rounded-tr-xl">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {projects.map((project) => (
                <tr 
                  key={project.id} 
                  className="hover:bg-indigo-50/50 transition duration-150 group"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900 flex items-center gap-3">
                      <div className="bg-indigo-100 p-2 rounded-lg">
                        <span className="text-indigo-600">📁</span>
                      </div>
                      <span>{project.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                      project.status === 'Completado' 
                        ? 'bg-green-100 text-green-800 shadow-sm' 
                        : project.status === 'En progreso' 
                          ? 'bg-yellow-100 text-yellow-800 shadow-sm'
                          : 'bg-blue-100 text-blue-800 shadow-sm'
                    }`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                      project.priority === 'Alta' 
                        ? 'bg-red-100 text-red-800 shadow-sm' 
                        : project.priority === 'Media' 
                          ? 'bg-orange-100 text-orange-800 shadow-sm'
                          : 'bg-gray-100 text-gray-800 shadow-sm'
                    }`}>
                      {project.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500 font-medium">
                    <div className="flex flex-col">
                      <span>{new Date(project.startDate).toLocaleDateString()}</span>
                      <span className="text-xs text-gray-400">
                        {new Date(project.startDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500 font-medium">
                    <div className="flex flex-col">
                      <span>{new Date(project.endDate).toLocaleDateString()}</span>
                      <span className="text-xs text-gray-400">
                        {new Date(project.endDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <Link
                        href={`/dashboard/projects/${project.id}`}
                        className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg text-sm font-medium transition duration-200 shadow-sm hover:shadow-md flex items-center gap-1.5"
                      >
                        <span>🔍</span>
                        <span>Ver</span>
                      </Link>
                      <Link
                        href={`/dashboard/projects/${project.id}/edit`}
                        className="text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded-lg text-sm font-medium transition duration-200 shadow-sm hover:shadow-md flex items-center gap-1.5"
                      >
                        <span>✏️</span>
                        <span>Editar</span>
                      </Link>
                      <button
                        onClick={() => confirmDelete(project.id)}

                        className="text-white bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-lg text-sm font-medium transition duration-200 shadow-sm hover:shadow-md flex items-center gap-1.5"
                      >
                        <span>🗑️</span>
                        <span>Eliminar</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="bg-gradient-to-r from-gray-50 to-indigo-50 p-4 flex items-center justify-between border-t border-gray-200">
          <div className="text-sm text-gray-500">
            Mostrando <span className="font-medium text-indigo-600">{projects.length}</span> proyectos
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-white text-gray-700 rounded-lg border border-gray-300 text-sm font-medium hover:bg-gray-50 transition">
              Anterior
            </button>
            <button className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition">
              Siguiente
            </button>
          </div>
        </div>
      </div>
    )}
    {showModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
        <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">¿Eliminar proyecto?</h2>
          <p className="text-gray-600 mb-6">Esta acción no se puede deshacer. ¿Estás seguro de eliminar este proyecto?</p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => {
                setShowModal(false);
                setSelectedProjectId(null);
              }}
              className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition"
            >
              Cancelar
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition"
            >
              Sí, eliminar
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
  );
}
