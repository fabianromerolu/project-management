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

    // ✅ SETEAR COOKIES
    res.cookie("accessToken", token, {
      httpOnly: true,
      sameSite: "lax", // o "none" si usas https
      secure: false,   // true si estás en producción con HTTPS
      maxAge: 15 * 60 * 1000, // 15 minutos
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
    });

    res.json({ user }); // ya no envíes el token en JSON si usas cookies
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
};

export const logout = async (_req: Request, res: Response) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.status(200).json({ message: "Sesión cerrada" });
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
