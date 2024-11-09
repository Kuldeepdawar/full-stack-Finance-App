// test/financeRoutes.test.js
const request = require("supertest");
const app = require("../server"); // Assuming your main server file is named server.js
const mongoose = require("mongoose");
const chai = require("chai");
const expect = chai.expect;

// Mock data
const mockApplication = {
  personalDetails: { name: "John Doe", age: 35, address: "123 Main St" },
  income: 5000,
  expenses: 2000,
  assets: 10000,
  liabilities: 3000,
};

describe("Finance API", function () {
  before(async function () {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
  });

  after(async function () {
    await mongoose.connection.close();
  });

  it("should create a new application", async function () {
    const res = await request(app).post("/api/finance").send(mockApplication);
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("_id");
  });

  it("should get applications for a user", async function () {
    const userId = "mockUserId"; // Replace with a real user ID or mock appropriately
    const res = await request(app).get(`/api/finance/${userId}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
  });

  it("should update an application by ID", async function () {
    const appId = "mockAppId"; // Replace with a real app ID or mock appropriately
    const updatedData = { income: 7000 };
    const res = await request(app)
      .put(`/api/finance/${appId}`)
      .send(updatedData);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("income", 7000);
  });

  it("should delete an application by ID", async function () {
    const appId = "mockAppId"; // Replace with a real app ID or mock appropriately
    const res = await request(app).delete(`/api/finance/${appId}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("message", "Application deleted");
  });
});
