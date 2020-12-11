import { Table } from "reactstrap";
import { MdEdit, MdDelete } from "react-icons/md";

const SchoolTable = ({ schools }) => {
  return (
    <Table bordered hover dark responsive className="table-sm mb-4 mt-1">
      <thead>
        <tr className="text-center text-warning">
          <th>Id</th>
          <th>School Name</th>
          <th>Address</th>
          <th>City</th>
          <th>Board</th>
          <th>Mail Id</th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody>
        {schools.map((school, i) => (
          <tr key={school._id} className="text-center">
            <td>{i + 1}</td>
            <td>
              {school.school_name === "" ? (
                <span className="text-danger font-weight-bold">N/A</span>
              ) : (
                school.school_name
              )}
            </td>
            <td>
              {school.address === "" ? (
                <span className="text-danger font-weight-bold">N/A</span>
              ) : (
                school.address
              )}
            </td>
            <td>{school.city}</td>

            <td>
              {school.board === ("" || "-") ? (
                <span className="text-danger font-weight-bold">N/A</span>
              ) : (
                school.board
              )}
            </td>

            <td>
              {school.mail_id === "" ? (
                <span className="text-danger font-weight-bold">N/A</span>
              ) : (
                school.mail_id
              )}
            </td>

            <td className="my-auto">
              <MdEdit color="#417dfd" size="20" style={{ cursor: "pointer" }} />
              &nbsp;&nbsp;
              <MdDelete color="red" size="20" style={{ cursor: "pointer" }} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default SchoolTable;
