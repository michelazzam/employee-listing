import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

interface Employee {
  _id: string;
  fullName: string;
  email: string;
  dateOfBirth: string;
  country: string;
  profilePicture?: string;
}

interface EmployeeModalProps {
  show: boolean;
  handleClose: () => void;
  handleSave: (employee: Employee) => void;
}

const EmployeeModal: React.FC<EmployeeModalProps> = ({
  show,
  handleClose,
  handleSave,
}) => {
  const [employee, setEmployee] = useState<Employee>({
    _id: "",
    fullName: "",
    email: "",
    dateOfBirth: "",
    country: "",
    profilePicture: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      [name]: value,
    });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmployee({
      ...employee,
      dateOfBirth: e.target.value,
    });
  };

  const handleSaveClick = () => {
    handleSave(employee);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Full Name"
              name="fullName"
              value={employee.fullName}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={employee.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="dateOfBirth"
              value={employee.dateOfBirth}
              onChange={handleDateChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Country"
              name="country"
              value={employee.country}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Profile Picture URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Profile Picture URL"
              name="profilePicture"
              value={employee.profilePicture}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveClick}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EmployeeModal;
