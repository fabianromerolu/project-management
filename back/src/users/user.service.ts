// src/users/user.service.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"; // Asegúrate de tenerlo instalado
const prisma = new PrismaClient();


export const createDeveloper = async (data: any) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  return prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      avatar: data.avatar,
      role: "DEVELOPER",
    },
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
      role: true,
      createdAt: true,
    },
  });
};

export const updateDeveloper = async (id: string, data: any) => {
  return prisma.user.update({
    where: { id },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
      role: true,
      createdAt: true,
    },
  });
};


export const getDevelopers = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;
  const [data, total] = await Promise.all([
    prisma.user.findMany({
      where: { role: "DEVELOPER" },
      skip,
      take: limit,
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        createdAt: true,
      },
    }),
    prisma.user.count({ where: { role: "DEVELOPER" } }),
  ]);

  return {
    total,
    page,
    pages: Math.ceil(total / limit),
    data,
  };
};
