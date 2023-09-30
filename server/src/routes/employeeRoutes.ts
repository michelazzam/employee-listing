import { create } from "domain";
import {
  createEmployee,
  deleteEmployee,
  listEmployees,
  updateEmployee,
} from "../controllers/employeeController";
import express, { Request, Response, NextFunction } from "express";

const router = express.Router();

// GET List of Employees
router.get("/list", listEmployees);

// // POST Create Employee
router.post("/create", createEmployee);

// // PUT Update Employee
router.put("/update", updateEmployee);

// // DELETE Delete Employee
router.delete("/delete", deleteEmployee);

export default router;
