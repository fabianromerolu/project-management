// __tests__/auth.test.ts
import request from "supertest";
import app from "../../app";

describe("Auth endpoints", () => {
  it("should register a new user", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({
        name: "Test User",
        email: `testuser${Date.now()}@example.com`,
        password: "test1234",
        role: "DEVELOPER",
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("user");
    expect(res.body.user.email).toMatch(/testuser.*@example\.com/);
  });

  it("should login and return tokens", async () => {
    const email = `testlogin${Date.now()}@example.com`;
    const password = "test1234";

    // Crear usuario primero
    await request(app).post("/auth/register").send({
      name: "Login User",
      email,
      password,
      role: "DEVELOPER",
    });

    // Luego intentar login
    const res = await request(app).post("/auth/login").send({ email, password });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body).toHaveProperty("refreshToken");
    expect(res.body).toHaveProperty("user");
  });
});
