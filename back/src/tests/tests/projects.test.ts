// __tests__/projects.test.ts
import request from "supertest";
import app from "../../app";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();
let token: string;
let createdProjectId = "";

beforeAll(async () => {
  await prisma.task.deleteMany();
  await prisma.project.deleteMany();
  await prisma.user.deleteMany();

  const user = {
    name: "Test Manager",
    email: "manager@example.com",
    password: "secure123",
    role: "MANAGER",
  };

  await request(app).post("/auth/register").send(user);

  
  const res = await request(app).post("/auth/login").send({
    email: user.email,
    password: user.password,
  });

  token = res.body.token;
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Proyectos - API", () => {
  it("Debería crear un proyecto", async () => {
    const res = await request(app)
      .post("/projects")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Proyecto de prueba",
        description: "Este es un proyecto de prueba",
        status: "PLANNING",
        priority: "HIGH",
        startDate: "2024-01-01",
        endDate: "2024-12-31",
        developersIds: [],
      });
    console.log(res.body);
  

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");

    createdProjectId = res.body.id;
  });

  it("Debería listar proyectos", async () => {
    const res = await request(app)
      .get("/projects")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true); // ✅ res.body.data, no res.body
  });

  it("Debería obtener un proyecto específico", async () => {
    const res = await request(app)
      .get(`/projects/${createdProjectId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Proyecto de prueba");
  });
});
