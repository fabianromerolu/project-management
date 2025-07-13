// src/users/user.controller.ts
import { Request, Response } from "express";
import * as service from "./user.service";
import { createDeveloperSchema } from "./user.validators";

export const create = async (req: Request, res: Response) => {
  try {
    const data = createDeveloperSchema.parse(req.body);
    const newUser = await service.createDeveloper(data);
    res.status(201).json(newUser);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};


export const getDevelopers = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const developers = await service.getDevelopers(page, limit);
    res.json(developers);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

import { updateDeveloperSchema } from "./user.validators";

export const update = async (req: Request, res: Response) => {
  try {
    const data = updateDeveloperSchema.parse(req.body);
    const updated = await service.updateDeveloper(req.params.id, data);
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
