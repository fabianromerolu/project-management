// src/tasks/task.validators.ts
import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  status: z.enum(["TODO", "IN_PROGRESS", "REVIEW", "DONE"]),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  assignedTo: z.string().uuid(),
  estimatedHours: z.number().nonnegative(),
  actualHours: z.number().nonnegative().optional(),
  dueDate: z.string(),
});

export const updateTaskSchema = createTaskSchema.partial();
