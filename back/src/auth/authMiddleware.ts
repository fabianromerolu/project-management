// src/auth/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  user?: any;
}

export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.accessToken; // 👈 Token desde cookie

  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token inválido o expirado" });
  }
};
