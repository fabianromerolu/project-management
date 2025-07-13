// src/auth/auth.controller.ts
import { Request, Response } from "express";
import { registerUser, loginUser, refreshAccessToken } from "./auth.service";
import { AuthenticatedRequest } from "./authMiddleware";

export const getProfile = async (req: AuthenticatedRequest, res: Response) => {
  res.json({ user: req.user });
};

export const register = async (req: Request, res: Response) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({ user });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { token, refreshToken, user } = await loginUser(email, password);
    res.json({ token, refreshToken, user });
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
};

export const refresh = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ error: "Refresh token requerido" });
  }

  try {
    const tokens = await refreshAccessToken(refreshToken);
    res.json(tokens);
  } catch (err: any) {
    res.status(403).json({ error: err.message });
  }
};
