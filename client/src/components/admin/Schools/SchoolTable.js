import { Table, Button } from "reactstrap";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const SchoolTable = ({ schools }) => {
  return (
    <Table bordered striped responsive className="mb-4 mt-1 table-sm">
      <thead>
        <tr className="text-center text-warning">
          <th>#</th>
          <th>School Name</th>
          <th>Address</th>
          <th>City</th>
          <th>Board</th>
          <th>Mail Id</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody className="text-white">
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

            <td>
              <Button color="primary" className="py-1 px-1 shadow-sm">
                <FaEdit size="14" /> Edit
              </Button>
              &nbsp;&nbsp;
              <Button color="danger" className="py-1 px-1 shadow-sm">
                <MdDelete size="14" /> Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default SchoolTable;
