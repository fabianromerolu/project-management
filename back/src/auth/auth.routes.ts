// src/auth/auth.routes.ts
import { Router } from "express";
import { login, register, getProfile, refresh, logout } from "./auth.controller";
import { authenticate } from "./authMiddleware";

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 */
router.post("/register", register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión con correo y contraseña
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token JWT y refresh token
 */
router.post("/login", login);

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Obtener un nuevo access token usando refresh token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Nuevo access token generado
 */
router.post("/refresh", refresh);

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Obtener el perfil del usuario autenticado
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil del usuario
 */
router.get("/profile", authenticate, getProfile);

router.post("/logout", logout);
/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Cerrar sesión del usuario
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Sesión cerrada exitosamente
 */
export default router;
