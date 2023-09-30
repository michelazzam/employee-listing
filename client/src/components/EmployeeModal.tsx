import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Image } from "react-bootstrap";
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

interface Employee {
  _id: string;
  fullName: string;
  email: string;
  dateOfBirth: Date;
  country: string;
  profilePicture?: string;
}

interface EmployeeModalProps {
  show: boolean;
  handleClose: () => void;
  handleListing: () => void;
  editEmployee: Employee | null;
}

const EmployeeModal: React.FC<EmployeeModalProps> = ({
  show,
  handleClose,
  handleListing,
  editEmployee,
}) => {
  const [employee, setEmployee] = useState<Employee>({
    _id: "",
    fullName: "",
    email: "",
    dateOfBirth: new Date(),
    country: "",
    profilePicture: "",
  });
  const [selectedCountry, setSelectedCountry] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editEmployee) {
      setEmployee(editEmployee);
      setSelectedCountry(editEmployee.country);
    }
  }, [editEmployee]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setEmployee({
          ...employee,
          profilePicture: reader.result?.toString(),
        });
      };
    }
  };

  const handleCountryChange = (countryName: string) => {
    setEmployee({
      ...employee,
      country: countryName,
    });
    setSelectedCountry(countryName);
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
      dateOfBirth: new Date(e.target.value),
    });
  };

  const handleSaveClick = () => {
    if (editEmployee) {
      handleEdit(employee);
    } else {
      if (!employee.fullName || !employee.email) {
        setError("Please enter full name and email");
      } else {
        setError("");
        handleAdd(employee);
      }
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
        if (response.status !== 200) {
          setError(response.data.message);
          return;
        } else {
          handleListing();
          handleClose();
        }
      });
  };

  const handleEdit = (obj: Employee) => {
    axios.put("http://localhost:3000/employee/update", obj).then((response) => {
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
              value={
                new Date(employee.dateOfBirth)?.toISOString().split("T")[0]
              }
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
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              size="sm"
              onChange={handleFileChange}
            />
          </Form.Group>
          {employee?.profilePicture && (
            <Image src={employee.profilePicture} alt="Uploaded" fluid />
          )}
        </Form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveClick}>
          {editEmployee ? "Edit" : "Save Changes"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EmployeeModal;
