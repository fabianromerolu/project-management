// front/src/app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function DashboardPage() {
  const { user } = useAuth();
  const [projectCount, setProjectCount] = useState(0);
  const [tasksByStatus, setTasksByStatus] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // ✅ Usar withCredentials para enviar cookie JWT
        const projectsRes = await axios.get('http://localhost:4000/projects', {
          withCredentials: true,
        });
        setProjectCount(projectsRes.data.length);

        const taskCounts: Record<string, number> = {
          TODO: 0,
          IN_PROGRESS: 0,
          REVIEW: 0,
          DONE: 0,
        };

        for (const project of projectsRes.data) {
          const tasksRes = await axios.get(`http://localhost:4000/projects/${project.id}/tasks`, {
            withCredentials: true,
          });

          for (const task of tasksRes.data) {
            if (task.assignedTo === user?.id) {
              taskCounts[task.status] = (taskCounts[task.status] || 0) + 1;
            }
          }
        }

        const formattedData = Object.entries(taskCounts).map(([status, count]) => ({
          status,
          count,
        }));

        setTasksByStatus(formattedData);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar datos del dashboard:', error);
        setLoading(false);
      }
    };

    if (user) fetchDashboardData();
  }, [user]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-black">Dashboard</h1>

      {loading ? (
        <p className="text-center mt-20 text-black">Cargando datos...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4 text-black">Proyectos activos</h2>
            <p className="text-4xl text-indigo-600 font-bold text-black">{projectCount}</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4 text-black">Tareas asignadas por estado</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={tasksByStatus}>
                <XAxis dataKey="status" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
