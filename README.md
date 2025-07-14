# 🧠 Project Management System - Full Stack
![Node Version](https://img.shields.io/badge/node-%3E%3D18-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0%2B-blue)

Plataforma completa para gestión de proyectos de desarrollo de software con autenticación segura, roles jerárquicos, tareas colaborativas y notificaciones en tiempo real.

## 🌟 Características principales

### 🔐 Seguridad
- Autenticación JWT con tokens de refresco
- Roles jerárquicos: ADMIN, MANAGER, DEVELOPER
- Helmet + RateLimit para protección avanzada
- Sanitización de entradas con Zod

### 🚀 Productividad
- CRUD completo de proyectos y tareas
- Notificaciones en tiempo real con WebSockets
- Paginación, filtrado y orden dinámico
- Documentación automática con Swagger

### 🧪 Calidad
- Arquitectura modular y escalable
- Validación estricta de datos
- Pruebas automatizadas con Jest
- Tipado estático con TypeScript

---

## 🛠️ Stack Tecnológico

### Backend
| Componente       | Tecnología        | Versión    |
|------------------|-------------------|------------|
| Runtime          | Node.js           | 18+        |
| Framework        | Express           | ^5.1.0     |
| ORM              | Prisma            | ^6.11.1    |
| DB               | PostgreSQL        | 15+        |
| Validación       | Zod               | ^4.0.5     |
| WebSockets       | Socket.io         | ^4.8.1     |
| Documentación    | Swagger           | ^5.0.1     |
| Testing          | Jest, Supertest   | ^30.0.4    |

### Frontend
| Componente       | Tecnología        |
|------------------|-------------------|
| Framework        | Next.js 15        |
| UI Library       | React 19          |
| Styling          | Tailwind CSS 4    |
| State Management | Context API       |
| HTTP Client      | Axios             |
| Charts           | Recharts          |

---

## 🚀 Guía de Inicio Rápido

### Requisitos previos
- Node.js v18+
- PostgreSQL v15+
- Prisma CLI: `npm install -g prisma`

### 1. Configuración del Backend

```bash
# Clonar repositorio
git clone https://github.com/fabianromerolu/project-management.git
cd project-management/back

# Instalar dependencias
npm install

# Configurar entorno
Crea un archivo `.env` con el siguiente contenido:

```env
PORT=4000
DATABASE_URL="postgresql://postgres:tu_contraseña@localhost:5432/projectdb"
JWT_SECRET="clave_supersecreta"
JWT_REFRESH_SECRET="clave_refresh_supersecreta"
TOKEN_EXPIRATION="15m"
REFRESH_EXPIRATION="7d"
```

# Inicializar base de datos
npx prisma migrate dev --name init

# Iniciar servidor
npm run dev
```

### 2. Configuración del Frontend

```bash
cd ../front
npm install
npm run dev
```

Accede a la aplicación:
- Frontend: http://localhost:3000
- Swagger Docs: http://localhost:4000/docs
- Prisma Studio: http://localhost:5555

---

## 🧱 Estructura del Proyecto

### Backend
```
back/
├── prisma/               # Modelos de base de datos
├── src/
│   ├── auth/             # Autenticación JWT
│   ├── users/            # Gestión de usuarios
│   ├── projects/         # CRUD proyectos
│   ├── tasks/            # CRUD tareas
│   ├── middleware/       # Seguridad y validación
│   ├── swagger.ts        # Documentación API
│   └── server.ts         # Configuración principal
```

### Frontend
```
front/
├── public/               # Assets estáticos
├── src/
│   ├── app/              # App Router (Next.js)
│   │   ├── auth/         # Login/Registro
│   │   ├── dashboard/    # Área privada
│   │   └── api/          # Rutas API
│   ├── components/       # UI Components
│   ├── contexts/         # Gestión de estado
│   ├── hooks/            # Custom Hooks
│   └── lib/              # Utilidades
```

---

## 📊 Flujo de Trabajo

```mermaid
sequenceDiagram
    participant Usuario
    participant Frontend
    participant Backend
    participant DB
    
    Usuario->>Frontend: Login
    Frontend->>Backend: POST /auth/login
    Backend->>DB: Validar credenciales
    DB-->>Backend: Datos usuario
    Backend-->>Frontend: JWT + Refresh Token
    Frontend->>Usuario: Dashboard
    
    loop Gestión Proyectos
        Usuario->>Frontend: Crear proyecto
        Frontend->>Backend: POST /projects
        Backend->>DB: Guardar proyecto
        Backend->>Frontend: WebSocket (project:created)
    end
```

---

## 🧪 Ejecución de Pruebas

```bash
# Ejecutar tests backend
cd back
npm run test



Cobertura de pruebas:
- Validación de endpoints
- Control de acceso por roles
- Pruebas de integración con DB
- Simulación de WebSockets

---

## 🛡️ Seguridad Implementada

| Característica              | Implementación                          |
|-----------------------------|-----------------------------------------|
| Autenticación               | JWT + Refresh Tokens                    |
| Protección de rutas         | Middleware de roles                     |
| Headers de seguridad        | Helmet                                  |
| Prevención de ataques       | Rate Limiting                           |
| Validación de datos         | Zod schema validation                   |
| Protección de cookies       | httpOnly, Secure, SameSite              |

---

## 📬 Contacto

**Fabian Mauricio Romero Lugo**  
💼 Desarrollador Full Stack  
📧 [fabianromerolu@gmail.com](mailto:fabianromerolu@gmail.com)  
🔗 [LinkedIn](https://www.linkedin.com/in/fabianromerolu/)  
📍 Montería, Colombia  
