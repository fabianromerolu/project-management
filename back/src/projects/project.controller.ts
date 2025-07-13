// src/projects/project.controller.ts
import { Request, Response } from "express";
import * as service from "./project.service";
import { createProjectSchema, updateProjectSchema } from "./project.validators";
import { AuthenticatedRequest } from "../auth/authMiddleware";
import { Prisma } from "@prisma/client";

export const create = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const data = createProjectSchema.parse(req.body);
    const project = await service.createProject(data, req.user.id);

    // 🔔 Emitir evento de creación de proyecto
    if (process.env.NODE_ENV !== "test") {
      const io = req.app.get("io");
      io?.emit("project:created", project);
    }


    res.status(201).json(project);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const listProjects = async (req: Request, res: Response) => {
  try {
    const { page = "1", limit = "10", status, priority, orderBy, orderDir } = req.query;

    const options = {
      page: parseInt(page as string),
      limit: parseInt(limit as string),
      status: status as string | undefined,
      priority: priority as string | undefined,
      orderBy: orderBy as string | undefined,
      orderDir: (orderDir as Prisma.SortOrder) || "asc",
    };

    const result = await service.getProjects(options);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const get = async (req: Request, res: Response) => {
  const project = await service.getProjectById(req.params.id);
  if (!project) return res.status(404).json({ error: "No encontrado" });
  res.json(project);
};

export const update = async (req: Request, res: Response) => {
  try {
    const data = updateProjectSchema.parse(req.body);
    const updated = await service.updateProject(req.params.id, data);
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const remove = async (req: AuthenticatedRequest, res: Response) => {
  const project = await service.getProjectById(req.params.id);
  if (!project) {
    return res.status(404).json({ message: "Proyecto no encontrado" });
  }

  if (req.user.role !== "ADMIN" && project.managerId !== req.user.id) {
    return res.status(403).json({ message: "No autorizado" });
  }

  await service.deleteProject(req.params.id);
  res.status(204).send();
};
