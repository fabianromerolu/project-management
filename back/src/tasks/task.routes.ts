// src/tasks/task.routes.ts
import { Router } from "express";
import * as controller from "./task.controller";
import { authenticate } from "../auth/authMiddleware";
import { authorize } from "../auth/roleMiddleware";

const router = Router();

router.use(authenticate);

/**
 * @swagger
 * /projects/{projectId}/tasks:
 *   get:
 *     summary: Listar tareas de un proyecto
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de tareas
 */
router.get("/projects/:projectId/tasks", controller.list);

/**
 * @swagger
 * /projects/{projectId}/tasks:
 *   post:
 *     summary: Crear una tarea en un proyecto
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Tarea creada
 */
router.post("/projects/:projectId/tasks", authorize(["MANAGER", "ADMIN"]), controller.create);

/**
 * @swagger
 * /projects/{projectId}/tasks/{taskId}:
 *   put:
 *     summary: Actualizar una tarea
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: Tarea actualizada
 */
router.put("/projects/:projectId/tasks/:taskId", authorize(["MANAGER", "ADMIN"]), controller.update);

/**
 * @swagger
 * /projects/{projectId}/tasks/{taskId}:
 *   delete:
 *     summary: Eliminar una tarea
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Tarea eliminada
 */
router.delete("/projects/:projectId/tasks/:taskId", authorize(["MANAGER", "ADMIN"]), controller.remove);



export default router;
