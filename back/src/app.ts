// src/app.ts
import express from "express";
import authRoutes from "./auth/auth.routes";
import projectRoutes from "./projects/project.routes";
import taskRoutes from "./tasks/task.routes";

const app = express();

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/projects", projectRoutes);
app.use("/", taskRoutes); // rutas de tareas dependen de proyectos

export default app;
