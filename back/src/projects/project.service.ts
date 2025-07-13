// src/projects/project.service.ts
import { PrismaClient, Prisma, ProjectStatus, Priority } from "@prisma/client";
import { ProjectQueryOptions } from "../interfaces/interfaces";

const prisma = new PrismaClient();

export const getProjects = async (options: ProjectQueryOptions) => {
  const { page, limit, status, priority, orderBy, orderDir } = options;

  const where: Prisma.ProjectWhereInput = {};

  if (status) where.status = status as ProjectStatus;
  if (priority) where.priority = priority as Priority;

  where.deletedAt = null;

  const order: Prisma.ProjectOrderByWithRelationInput = orderBy
    ? { [orderBy]: orderDir }
    : { createdAt: "desc" };

  const [projects, total] = await Promise.all([
    prisma.project.findMany({
      where,
      orderBy: order,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        manager: true,
        developers: true,
        tasks: true,
      },
    }),
    prisma.project.count({ where }),
  ]);

  return {
    data: projects,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
};

export const createProject = async (data: any, managerId: string) => {
  const { developersIds, ...rest } = data;

  return prisma.project.create({
    data: {
      ...rest,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      managerId,
      ...(developersIds?.length
        ? {
            developers: {
              connect: developersIds.map((id: string) => ({ id })),
            },
          }
        : {}),
    },
  });
};

export const getProjectById = async (id: string) => {
  return prisma.project.findUnique({
    where: { id },
    include: { manager: true, developers: true },
  });
};

export const updateProject = async (id: string, data: any) => {
  return prisma.project.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
      status: data.status,
      priority: data.priority,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      ...(data.developersIds?.length
        ? {
            developers: {
              connect: data.developersIds.map((id: string) => ({ id })),
            },
          }
        : {}),
    },
  });
};

export const deleteProject = async (id: string) => {
  return prisma.project.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
};
