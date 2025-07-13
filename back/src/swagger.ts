// src/swagger.ts
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Project Management API",
    version: "1.0.0",
    description: "Documentación de la API para la plataforma de gestión de proyectos de desarrollo de software",
  },
  servers: [
    {
      url: "http://localhost:4000",
      description: "Servidor local",
    },
  ],
   components: {
        securitySchemes: {
            bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
            },
        },
        schemas: {
            User: {
            type: "object",
            properties: {
                id: { type: "string", format: "uuid" },
                name: { type: "string" },
                email: { type: "string", format: "email" },
                role: { $ref: "#/components/schemas/Role" },
                avatar: { type: "string", format: "uri" },
                createdAt: { type: "string", format: "date-time" },
            },
            },
            Project: {
            type: "object",
            required: ["name", "status", "priority", "startDate", "endDate"],
            properties: {
                name: { type: "string" },
                description: { type: "string" },
                status: { $ref: "#/components/schemas/ProjectStatus" },
                priority: { $ref: "#/components/schemas/Priority" },
                startDate: { type: "string", format: "date" },
                endDate: { type: "string", format: "date" },
                developersIds: {
                type: "array",
                items: { type: "string", format: "uuid" },
                },
            },
            },
            Task: {
            type: "object",
            required: ["title", "status", "priority", "dueDate", "estimatedHours"],
            properties: {
                title: { type: "string" },
                description: { type: "string" },
                status: { $ref: "#/components/schemas/TaskStatus" },
                priority: { $ref: "#/components/schemas/Priority" },
                assignedTo: { type: "string", format: "uuid" },
                estimatedHours: { type: "number" },
                actualHours: { type: "number" },
                dueDate: { type: "string", format: "date" },
            },
            },
            Role: {
            type: "string",
            enum: ["ADMIN", "MANAGER", "DEVELOPER"],
            },
            ProjectStatus: {
            type: "string",
            enum: ["PLANNING", "IN_PROGRESS", "COMPLETED", "CANCELLED"],
            },
            TaskStatus: {
            type: "string",
            enum: ["TODO", "IN_PROGRESS", "REVIEW", "DONE"],
            },
            Priority: {
            type: "string",
            enum: ["LOW", "MEDIUM", "HIGH"],
            },
        },
    },

  security: [{ bearerAuth: [] }],
};

const options = {
  swaggerDefinition,
  apis: ["./src/**/*.ts"], // Asegúrate que aquí coincida con tus rutas y controladores
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
