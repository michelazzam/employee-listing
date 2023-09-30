import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import countries from "../constants/countryCode";
import CountrySelect from "./CountrySelect";
import axios from "axios";

interface Country {
  name: string;
  native: string;
  phone: number[];
  continent: string;
  capital: string;
  currency: string[];
  languages: string[];
  phoneLength: number;
}

interface Countries {
  [key: string]: Country;
}

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
  handleListing: () => void;
}

const EmployeeModal: React.FC<EmployeeModalProps> = ({
  show,
  handleClose,
  handleListing,
}) => {
  const [employee, setEmployee] = useState<Employee>({
    _id: "",
    fullName: "",
    email: "",
    dateOfBirth: "",
    country: "",
    profilePicture: "",
  });
  const [selectedCountry, setSelectedCountry] = useState("");
  const [error, setError] = useState("");

  const handleCountryChange = (countryCode: string, countryName: string) => {
    setEmployee({
      ...employee,
      country: countryName,
    });
    setSelectedCountry(countryCode);
  };

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
    if (!employee.fullName || !employee.email) {
      setError("Please enter full name and email");
    } else {
      setError("");
      handleAdd(employee);
    }
  };

  const handleAdd = ({
    fullName,
    email,
    dateOfBirth,
    country,
    profilePicture,
  }: Employee) => {
    axios
      .post("http://localhost:3000/employee/create", {
        fullName,
        email,
        dateOfBirth,
        country,
        profilePicture,
      })
      .then((response) => {
        console.log(response);
        if (response.status !== 200) {
          setError(response.data.message);
          return;
        } else {
          handleListing();
          handleClose();
        }
      });
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

          <Form.Group controlId="formBasicCountry">
            <Form.Label>Country</Form.Label>
            <CountrySelect
              selectedCountry={selectedCountry}
              onCountryChange={handleCountryChange}
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
        {error && <p style={{ color: "red" }}>{error}</p>}
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
