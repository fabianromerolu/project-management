// src/tasks/task.service.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createTask = async (projectId: string, data: any) => {
  return prisma.task.create({
    data: {
      ...data,
      dueDate: new Date(data.dueDate),
      projectId,
    },
  });
};

export const getTasksByProject = async (projectId: string) => {
  return prisma.task.findMany({
    where: { projectId },
    include: { assignedUser: true }, // ✅ campo correcto
  });
};

export const updateTask = async (id: string, data: any) => {
  return prisma.task.update({
    where: { id },
    data: {
      ...data,
      dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
    },
  });
};

export const deleteTask = async (id: string) => {
  return prisma.task.delete({ where: { id } });
};
