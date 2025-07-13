import bcrypt from "bcrypt";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Asegurar que las variables de entorno existen
if (!process.env.JWT_SECRET || !process.env.JWT_REFRESH_SECRET) {
  throw new Error("JWT_SECRET or JWT_REFRESH_SECRET is not defined in .env");
}

const jwtSecret: Secret = process.env.JWT_SECRET;
const refreshSecret: Secret = process.env.JWT_REFRESH_SECRET;

// Opciones de expiración con tipo correcto
const tokenOptions: SignOptions = { expiresIn: '15m' };
const refreshOptions: SignOptions = { expiresIn: '7d' };

export const registerUser = async (data: any) => {
  const { name, email, password, role } = data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error("El usuario ya existe");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });

  return user;
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Credenciales inválidas");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Credenciales inválidas");

  const token = jwt.sign(
    { id: user.id, role: user.role },
    jwtSecret,
    tokenOptions
  );

  const refreshToken = jwt.sign(
    { id: user.id },
    refreshSecret,
    refreshOptions
  );

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken },
  });

  return { token, refreshToken, user };
};

export const refreshAccessToken = async (oldRefreshToken: string) => {
  try {
    const payload = jwt.verify(oldRefreshToken, refreshSecret) as { id: string };
    const user = await prisma.user.findUnique({ where: { id: payload.id } });

    if (!user || user.refreshToken !== oldRefreshToken) {
      throw new Error("Refresh token inválido");
    }

    const newAccessToken = jwt.sign(
      { id: user.id, role: user.role },
      jwtSecret,
      tokenOptions
    );

    const newRefreshToken = jwt.sign(
      { id: user.id },
      refreshSecret,
      refreshOptions
    );

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: newRefreshToken },
    });

    return { token: newAccessToken, refreshToken: newRefreshToken };
  } catch (error) {
    throw new Error("Token inválido o expirado");
  }
};