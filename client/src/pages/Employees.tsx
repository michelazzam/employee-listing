// Employees.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";

interface Employee {
  _id: string;
  fullName: string;
  email: string;
  dateOfBirth: Date;
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
      {/*... Add and Edit button logic ...*/}
      <table>
        {/*... Table headers ...*/}
        <tbody>
          {employees?.map((employee) => (
            <tr key={employee._id}>
              <td>
                <tr>
                  <td>{employee._id}</td>
                  <td>{employee.fullName}</td>
                  <td>{employee.email}</td>
                  <td>{employee.dateOfBirth.toString()}</td>
                  <td>{employee.country}</td>
                  <td>{employee.profilePicture}</td>
                </tr>
                <button onClick={() => handleDelete(employee._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Employees;
