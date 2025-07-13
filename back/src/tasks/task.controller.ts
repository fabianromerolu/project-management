// src/tasks/task.controller.ts
import { Request, Response } from "express";
import * as service from "./task.service";
import { createTaskSchema, updateTaskSchema } from "./task.validators";

export const create = async (req: Request, res: Response) => {
  try {
    const data = createTaskSchema.parse(req.body);
    const task = await service.createTask(req.params.projectId, data);

    // Emitir evento socket
    const io = req.app.get("io");
    io.emit("task:created", task);

    res.status(201).json(task);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const list = async (req: Request, res: Response) => {
  const tasks = await service.getTasksByProject(req.params.projectId);
  res.json(tasks);
};

export const update = async (req: Request, res: Response) => {
  try {
    const data = updateTaskSchema.parse(req.body);
    const updated = await service.updateTask(req.params.taskId, data);

    // Emitir evento socket
    const io = req.app.get("io");
    io.emit("task:updated", updated);

    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const remove = async (req: Request, res: Response) => {
  const taskId = req.params.taskId;

  await service.deleteTask(taskId);

  // Emitir evento socket
  const io = req.app.get("io");
  io.emit("task:deleted", { id: taskId });

  res.status(204).send();
};
