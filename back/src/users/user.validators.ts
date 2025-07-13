// src/users/user.validators.ts
import { z } from "zod";

export const createDeveloperSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  avatar: z.string().url().optional(),
});

export const updateDeveloperSchema = z.object({
  name: z.string().min(3).optional(),
  email: z.string().email().optional(),
  avatar: z.string().url().optional(),
});
