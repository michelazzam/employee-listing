import { Badge, Button, ButtonGroup, Table } from "react-bootstrap";

interface Employee {
  _id: string;
  fullName: string;
  email: string;
  dateOfBirth: string;
  country: string;
  profilePicture: string;
}

interface TableDataProps {
  employeesList: Employee[];
}

const TableData: React.FC<TableDataProps> = ({ employeesList }) => {
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
          {employeesList?.map((item, index) => (
            <tr key={index}>
              <td>{item._id}</td>
              <td>{item.fullName}</td>
              <td>{item.email}</td>
              <td>{item.dateOfBirth}</td>
              <td>{item.country}</td>
              <td>item.profilePicture</td>

              <td>
                <ButtonGroup aria-label="Employee action">
                  <Button href="#" style={{ marginRight: "10px" }}>
                    Edit
                  </Button>
                  <Button href="#">X</Button>
                </ButtonGroup>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default TableData;
