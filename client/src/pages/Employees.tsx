// Employees.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import TableData from "../components/table/TableData";
import { Button } from "react-bootstrap";
import EmployeeModal from "../components/modals/EmployeeModal";

// Define the structure of Employee object using an interface
interface Employee {
  _id: string;
  fullName: string;
  email: string;
  dateOfBirth: Date;
  country: string;
  profilePicture?: string;
}

// Define the Employees Functional Component
const Employees: React.FC = () => {
  // State for holding the list of employees
  const [employees, setEmployees] = useState<Employee[]>([]);
  // State for holding the employee to be edited
  const [editEmployee, setEditEmployee] = useState<Employee | null>(null);
  // State for controlling the visibility of the EmployeeModal
  const [openModal, setOpenModal] = useState<boolean>(false);

  // Use effect to call handleListing on component mount
  useEffect(() => {
    handleListing();
  }, []);

  // Function to fetch the list of employees from the server
  const handleListing = () => {
    try {
      axios
        .get(`${process.env.REACT_APP_API_URL}/employee/list`)
        .then((response) => {
          // Update the employees state with the fetched employees data
          setEmployees(response.data.employees);
        });
    } catch (err) {
      console.log(err);
    }
  };

  // Function to handle the deletion of an employee
  const handleDelete = (id: string) => {
    try {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/employee/delete`, {
          data: { _id: id },
        })
        .then((response) => {
          // Update the employees state by filtering out the deleted employee
          setEmployees(employees.filter((emp) => emp._id !== id));
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <header className="d-flex justify-content-between w-50 mb-2 mt-2">
        <h1>Employee Listing</h1>
        <Button href="#" variant="success" onClick={() => setOpenModal(true)}>
          Add
        </Button>
      </header>
      <table>
        <tbody>
          <TableData
            employeesList={employees}
            handleDelete={handleDelete}
            setEditEmployee={(obj: Employee) => {
              setOpenModal(true);
              setEditEmployee(obj);
            }}
          />
        </tbody>
      </table>
      <EmployeeModal
        show={openModal}
        handleClose={() => {
          setOpenModal(false);
          setEditEmployee(null);
        }}
        handleListing={handleListing}
        editEmployee={editEmployee}
      />
    </div>
  );
};

export default Employees;
