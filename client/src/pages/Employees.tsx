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
  dateOfBirth: Date;
  country: string;
  profilePicture?: string;
}

const Employees: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [editEmployee, setEditEmployee] = useState<Employee | null>(null);
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
