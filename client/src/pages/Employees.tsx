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
  const [openModal, setOpenModal] = useState<boolean>(false);

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

  const handleEdit = (obj: Employee) => {
    axios.put("http://localhost:3000/employee/update", obj).then((response) => {
      setCustomEmployee(null);
    });
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
          <TableData employeesList={employees} handleDelete={handleDelete} />
        </tbody>
      </table>
      <EmployeeModal
        show={openModal}
        handleClose={() => setOpenModal(false)}
        handleListing={handleListing}
      />
    </div>
  );
};

export default Employees;
