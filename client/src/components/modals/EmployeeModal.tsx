import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Image } from "react-bootstrap";
import CountrySelect from "../CountrySelect";
import axios from "axios";

// Define the Employee interface to specify the shape of an employee object
interface Employee {
  _id: string;
  fullName: string;
  email: string;
  dateOfBirth: Date;
  country: string;
  profilePicture?: string;
}

// Define the props interface to specify the shape of the props object
interface EmployeeModalProps {
  show: boolean;
  handleClose: () => void;
  handleListing: () => void;
  editEmployee: Employee | null;
}

// Define the EmployeeModal functional component
const EmployeeModal: React.FC<EmployeeModalProps> = ({
  show,
  handleClose,
  handleListing,
  editEmployee,
}) => {
  // Define state variables using the useState hook
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

  // useEffect hook to handle component did mount and update lifecycle events
  useEffect(() => {
    if (editEmployee) {
      setEmployee(editEmployee);
      setSelectedCountry(editEmployee.country);
    }
    return () => {
      // Cleanup function to reset the state when the component is unmounted or props are changed
      setEmployee({
        _id: "",
        fullName: "",
        email: "",
        dateOfBirth: new Date(),
        country: "",
        profilePicture: "",
      });
      setSelectedCountry("");
      setError("");
    };
  }, [editEmployee]);

  // Function to handle file input change event
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

  // Function to handle country selection change
  const handleCountryChange = (countryName: string) => {
    setEmployee({
      ...employee,
      country: countryName,
    });
    setSelectedCountry(countryName);
  };

  // General function to handle input field change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      [name]: value,
    });
  };

  // Function to handle date input field change
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmployee({
      ...employee,
      dateOfBirth: new Date(e.target.value),
    });
  };

  // Function to handle save button click event
  const handleSaveClick = () => {
    if (editEmployee) {
      handleEdit(employee);
    } else {
      if (!employee.fullName || !employee.email) {
        setError("Please enter full name and email");
      } else {
        handleAdd(employee);
      }
    }
  };

  // Function to handle addition of a new employee using Axios POST request
  const handleAdd = ({
    fullName,
    email,
    dateOfBirth,
    country,
    profilePicture,
  }: Employee) => {
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("dateOfBirth", dateOfBirth?.toString());
    formData.append("country", country);
    formData.append("profilePicture", profilePicture || "");

    axios
      .post(`${process.env.REACT_APP_API_URL}/employee/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.data.error) {
          setError(response.data.message);
          return;
        } else {
          successResponse();
        }
      });
  };

  // Function to handle editing of an existing employee using Axios PUT request
  const handleEdit = (obj: Employee) => {
    try {
      const formData = new FormData();
      obj.fullName && formData.append("fullName", obj.fullName);
      obj.email && formData.append("email", obj.email);
      obj.dateOfBirth &&
        formData.append("dateOfBirth", obj.dateOfBirth?.toString());
      obj.country && formData.append("country", obj.country);
      obj.profilePicture &&
        formData.append("profilePicture", obj.profilePicture || "");
      formData.append("_id", obj._id);

      axios
        .put(`${process.env.REACT_APP_API_URL}/employee/update`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response);
          if (response.data.error) {
            setError(response.data.message);
            return;
          } else {
            successResponse();
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  // Function to handle successful response from the server
  const successResponse = () => {
    setError("");
    handleListing();
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
              value={
                employee.dateOfBirth
                  ? new Date(employee.dateOfBirth)?.toISOString().split("T")[0]
                  : ""
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
