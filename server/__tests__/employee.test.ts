import "jest";
import request from "supertest";
import { app } from "../src/server"; // Import your Express app

describe("Employee Routes", () => {
  it("should list all employees", async () => {
    try {
      const res = await request(app).get("/employee/list");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("employees");
      expect(Array.isArray(res.body.employees)).toBe(true); // check if employees is an array
    } catch (error) {
      console.error(error);
      throw error;
    }
  });

  it("should create a new employee", async () => {
    const res = await request(app).post("/employee/create").send({
      fullName: "John Do",
      email: "john.do@example.com",
      dateOfBirth: "1990-01-01",
      country: "US",
    });

    // if (res.statusCode === 400) {
    //   expect(res.body).toHaveProperty("message", "Email already exists");
    // } else {
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("fullName", "John Do");
    // }
  });

  it("should update the fullName of the added employee", async () => {
    const resList = await request(app).get("/employee/list");

    const addedEmployee = resList.body.employees.find(
      (employee: any) => employee.email === "john.do@example.com"
    );
    const res = await request(app).put("/employee/update").send({
      _id: addedEmployee?._id,
      fullName: "updated John Do",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("fullName", "updated John Do");
  });

  it("should delete the newly added employee", async () => {
    const resList = await request(app).get("/employee/list");
    const addedEmployee = resList.body.employees.find(
      (employee: any) => employee.email === "john.do@example.com"
    );
    const res = await request(app).delete("/employee/delete").send({
      _id: addedEmployee?._id,
    });

    if (res.statusCode === 400) {
      expect(res.body).toHaveProperty("message", "Employee not available");
    } else {
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty(
        "message",
        "Employee deleted successfully"
      );
    }
  });
});
