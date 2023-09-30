// Employees.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import TableData from "../components/TableData";
import { Button } from "react-bootstrap";
import EmployeeModal from "../components/EmployeeModal";

interface Employee {
  _id: string;
  fullName: string;
  email: string;
  dateOfBirth: string;
  country: string;
  profilePicture?: string;
}

const Employees: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [customEmployee, setCustomEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    handleListing();
  }, []);

  const handleListing = () => {
    // Fetch employees
    axios.get("http://localhost:3000/employee/list").then((response) => {
      setEmployees(response.data.employees);
    });
  };

  const handleDelete = (id: string) => {
    axios
      .delete("http://localhost:3000/employee/delete", { data: { _id: id } })
      .then((response) => {
        setEmployees(employees.filter((emp) => emp._id !== id));
      });
  };

  const handleAdd = (obj: Employee) => {
    axios
      .post("http://localhost:3000/employee/create", obj)
      .then((response) => {
        handleListing();
      });
  };

  const handleEdit = (obj: Employee) => {
    axios.put("http://localhost:3000/employee/update", obj).then((response) => {
      setCustomEmployee(null);
    });
  };

  return (
    <div>
      <header>
        <h1>Employee Listing</h1>
        <Button
          href="#"
          style={{ marginRight: "10px" }}
          onClick={() =>
            setCustomEmployee({
              _id: "6517f0144780c8d70724661f",
              fullName: "georges",
              email: "john@gmail.com",
              dateOfBirth: "1990-01-01T00:00:00.000Z",
              country: "India",
            })
          }
        >
          Add
        </Button>
      </header>
      <table>
        <tbody>
          <TableData employeesList={employees} />
        </tbody>
      </table>
      <EmployeeModal
        show={customEmployee ? true : false}
        handleClose={() => setCustomEmployee(null)}
        handleSave={(employee) => setCustomEmployee(employee)}
      />
    </div>
  );
};

export default Employees;
