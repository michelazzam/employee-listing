import { Badge, Button, ButtonGroup, Table } from "react-bootstrap";

interface Employee {
  _id: string;
  fullName: string;
  email: string;
  dateOfBirth: Date;
  country: string;
  profilePicture?: string;
}

interface TableDataProps {
  employeesList: Employee[];
  handleDelete: (id: string) => void;
  setEditEmployee: (obj: Employee) => void;
}

const TableData: React.FC<TableDataProps> = ({
  employeesList,
  handleDelete,
  setEditEmployee,
}) => {
  const theadContent = [
    "_id",
    "Full Name",
    "Email",
    "Date of Birth",
    "Country",
    "Profile Picture",
  ];

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            {theadContent.map((value, i) => (
              <th key={i}>{value}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {employeesList?.map((item: Employee, index) => {
            const date = new Date(item.dateOfBirth?.toString());
            return (
              <tr key={index}>
                <td>{item._id}</td>
                <td>{item.fullName}</td>
                <td>{item.email}</td>
                <td>
                  {item.dateOfBirth
                    ? `${
                        date.getMonth() + 1
                      }/${date.getDate()}/${date.getFullYear()}`
                    : ""}
                </td>
                <td>{item.country}</td>
                <td>item.profilePicture</td>

                <td>
                  <ButtonGroup aria-label="Employee action">
                    <Button
                      variant="secondary"
                      href="#"
                      style={{ marginRight: "10px" }}
                      onClick={() => setEditEmployee(item)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      href="#"
                      onClick={() => handleDelete(item._id)}
                    >
                      X
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default TableData;
