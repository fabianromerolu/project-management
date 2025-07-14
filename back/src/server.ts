// src/server.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import authRoutes from './auth/auth.routes';
import projectRoutes from "./projects/project.routes";
import taskRoutes from "./tasks/task.routes";
import userRoutes from './users/user.routes';
import http from "http";
import { Server } from "socket.io";
import { setupSwagger } from "./swagger";


export const startServer = () => {
  const app = express();
  setupSwagger(app);
  const server = http.createServer(app);

  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", //frontend
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    },
  });

  // Guardar instancia de socket.io para usar en controladores
  app.set("io", io);

  // Logs de conexión de sockets
  io.on("connection", (socket) => {
    console.log("🔌 Usuario conectado:", socket.id);

    socket.on("disconnect", () => {
      console.log("❌ Usuario desconectado:", socket.id);
    });
  });

  // Middlewares globales
  app.use(helmet());
  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json());
  app.use(cookieParser());
  app.use(morgan('dev'));

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      message: 'Demasiadas solicitudes desde esta IP, inténtalo más tarde.',
    })
  );

  // Rutas
  app.use("/auth", authRoutes);
  app.use("/projects", projectRoutes);
  app.use("/users", userRoutes);
  app.use(taskRoutes); // ya incluye el path interno

  // Escucha del servidor con WebSockets habilitados
  const PORT = process.env.PORT || 4000;
  server.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
};


startServer();
