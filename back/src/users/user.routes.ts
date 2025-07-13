// src/users/user.routes.ts
import { Router } from "express";
import { create, getDevelopers, update } from "./user.controller";
import { authenticate } from "../auth/authMiddleware";
import { authorize } from "../auth/roleMiddleware";

const router = Router();

router.use(authenticate);
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Listar desarrolladores
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios con rol developer
 */
router.get("/", authorize(["ADMIN", "MANAGER"]), getDevelopers);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crear un nuevo desarrollador
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password, role]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [developer, manager, admin]
 *     responses:
 *       201:
 *         description: Usuario creado
 */
router.post("/", authorize(["ADMIN", "MANAGER"]), create);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Actualizar un desarrollador
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado
 */
router.put("/:id", authorize(["ADMIN", "MANAGER"]), update);




export default router;
