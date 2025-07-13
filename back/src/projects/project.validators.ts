// src/projects/project.validators.ts
import { z } from "zod";

export const createProjectSchema = z.object({
  name: z.string().min(3),
  description: z.string().optional(),
  status: z.enum(["PLANNING", "IN_PROGRESS", "COMPLETED", "CANCELLED"]),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  startDate: z.string(),
  endDate: z.string(),
  developersIds: z.array(z.string().uuid()).optional(),
});

export const updateProjectSchema = createProjectSchema.partial();
