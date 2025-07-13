// src/auth/roleMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./authMiddleware";

export const authorize = (roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user || !roles.includes(user.role)) {
      return res.status(403).json({ message: "No autorizado" });
    }
    next();
  };
};
