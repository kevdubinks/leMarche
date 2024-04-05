// tests/usersController.test.js
const request = require("supertest");
const app = require("../app"); // Assurez-vous d'exporter votre instance d'application Express

describe("POST /users/register", () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/api/users/register").send({
      username: "testUser",
      email: "test@example.com",
      password: "password",
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("user");
    // Ajoutez d'autres assertions selon les données renvoyées
  });
});
