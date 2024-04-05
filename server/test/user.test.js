// tests/User.test.js
const User = require("../modeles/userModels");

describe("User Model", () => {
  it("should hash the password before saving", async (done) => {
    const userData = {
      username: "testUser",
      email: "test@example.com",
      password: "password",
    };
    const user = new User(userData);

    await user.save();

    expect(user.password).not.toBe(userData.password);
    // Assurez-vous que la logique de hashage est implémentée dans votre modèle User
    done();
  }, 50000);
});
