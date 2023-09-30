import { create } from "domain";
import {
  createEmployee,
  deleteEmployee,
  listEmployees,
  updateEmployee,
} from "../controllers/employeeController";
import express, { Request, Response, NextFunction } from "express";
import { imageHandler } from "../middlewares/imageHandling";

const router = express.Router();

// GET List of Employees
router.get("/list", listEmployees);

// // POST Create Employee
router.post("/create", imageHandler, createEmployee);

// // PUT Update Employee
router.put("/update", imageHandler, updateEmployee);

// // DELETE Delete Employee
router.delete("/delete", deleteEmployee);

export default router;
