// src/projects/project.routes.ts
import { Router } from "express";
import * as controller from "./project.controller";
import { authenticate } from "../auth/authMiddleware";
import { authorize } from "../auth/roleMiddleware";



const router = Router();

router.use(authenticate);

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Listar todos los proyectos
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *       - name: status
 *         in: query
 *         schema:
 *           type: string
 *       - name: priority
 *         in: query
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de proyectos
 */
router.get("/", authenticate, controller.listProjects);

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Crear un nuevo proyecto
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       201:
 *         description: Proyecto creado exitosamente
 */
router.post("/", authorize(["MANAGER", "ADMIN"]), controller.create);

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Obtener un proyecto específico
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalles del proyecto
 */
router.get("/:id", controller.get);

/**
 * @swagger
 * /projects/{id}:
 *   put:
 *     summary: Actualizar un proyecto
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       200:
 *         description: Proyecto actualizado
 */
router.put("/:id", authorize(["MANAGER", "ADMIN"]), controller.update);

/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     summary: Eliminar un proyecto
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Proyecto eliminado
 */
router.delete("/:id", authorize(["MANAGER", "ADMIN"]), controller.remove);



export default router;
