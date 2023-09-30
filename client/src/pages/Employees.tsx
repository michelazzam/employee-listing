// Employees.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import TableData from "../components/TableData";
import { Button } from "react-bootstrap";

interface Employee {
  _id: string;
  fullName: string;
  email: string;
  dateOfBirth: string;
  country: string;
  profilePicture: string;
}

const Employees: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    // Fetch employees
    axios.get("http://localhost:3000/employee/list").then((response) => {
      setEmployees(response.data.employees);
    });
  }, []);

  const handleDelete = (id: string) => {
    axios
      .delete("http://localhost:3000/employee/delete", { data: { _id: id } })
      .then((response) => {
        setEmployees(employees.filter((emp) => emp._id !== id));
      });
  };
  console.log(employees);
  return (
    <div>
      <header>
        <h1>Employee Listing</h1>
        <Button href="#" style={{ marginRight: "10px" }}>
          Add
        </Button>
      </header>
      <table>
        <tbody>
          <TableData employeesList={employees} />
        </tbody>
      </table>
    </div>
  );
};

export default Employees;
