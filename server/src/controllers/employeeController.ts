/**
 * Importing necessary types from express and the Employee model
 */
import { Request, Response } from "express";
import Employee from "../models/employeeModel";

/**
 * Asynchronous function to list all employees.
 * @async
 * @function
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} - Returns promise of void.
 */
export const listEmployees = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const employees = await Employee.find(); // Fetching all employees from the database
    res.json({ employees }); // Sending the employees list as JSON
  } catch (err) {
    res.status(500).send(err); // Sending error response in case of an error
  }
};

/**
 * Asynchronous function to create a new employee.
 * @async
 * @function
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} - Returns promise of void.
 * @example
 * // Request body
 * {
 *  "fullName": "John Doe",
 *  "email": "john@gmail.com",
 *  "dateOfBirth": "1990-01-01",
 *  "country": "India"
 *  }
 * @requires fullName - Employee's full name
 * @requires email - Employee's email
 */
export const createEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { fullName, email } = req.body; // Destructuring the request body to get the fullName and email
    if (!fullName || !email) {
      res.status(400).json({ message: "Missing required fields" }); // Sending error response in case of missing required fields
      return;
    }

    //check if email already exists
    const alreadyAdded = await Employee.findOne({ email: email });

    if (alreadyAdded) {
      res.status(400).json({ message: "Email already exists" }); // Sending error response in case of missing required fields
      return;
    }

    const newEmployee = new Employee(req.body); // Creating a new employee instance with the request body
    await newEmployee.save(); // Saving the new employee to the database
    res.json(newEmployee); // Sending the new employee data as JSON
  } catch (err) {
    res.status(500).send(err); // Sending error response in case of an error
  }
};

/**
 * Asynchronous function to update an existing employee.
 * @async
 * @function
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} - Returns promise of void.
 */
export const updateEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { fullName, email } = req.body; // Destructuring the request body to get the fullName and email

    //fullName and email should never be set to an empty string or removed
    if (
      email === null ||
      fullName === null ||
      fullName === "" ||
      email === ""
    ) {
      res.status(400).json({ message: "Required fields cannot be empty" }); // Sending error response in case of missing required fields
      return;
    }

    if (email) {
      const alreadyExistingEmail = await Employee.findOne({ email });

      if (
        alreadyExistingEmail &&
        alreadyExistingEmail._id.toString() !== req.body._id
      ) {
        res.status(400).json({ message: "Email cannot be used" }); // Sending error response when email is already used
        return;
      }
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.body._id, // Employee ID to find the employee to be updated
      req.body, // New data for updating the employee
      { new: true } // Option to return the new updated employee data
    );
    res.json(updatedEmployee); // Sending the updated employee data as JSON
  } catch (err) {
    res.status(500).send(err); // Sending error response in case of an error
  }
};

/**
 * Asynchronous function to delete an employee.
 * @async
 * @function
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} - Returns promise of void.
 */
export const deleteEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.body._id) {
      res.status(400).json({ message: "Employee ID missing" }); // if the employee ID is not provided
      return;
    }
    const deletedEmployee = await Employee.findByIdAndDelete(req.body._id); // Finding and deleting the employee by ID

    if (!deletedEmployee) {
      res.status(400).json({ message: "Employee not available" }); // returning employee is not found
      return;
    }

    res.json({ message: "Employee deleted successfully" }); // Sending a success message as JSON
  } catch (error) {
    res.status(500).json({ error: "Server Error" }); // Sending error response in case of an error
  }
};
