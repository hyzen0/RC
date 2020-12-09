import { Table } from "reactstrap";
import { MdEdit, MdDelete } from "react-icons/md";

const BlogTable = ({ blogs, replace }) => {
  return (
    <Table bordered hover dark responsive className="table-sm my-4">
      <thead>
        <tr className="text-center text-warning">
          <th>Id</th>
          <th>Image</th>
          <th>Title</th>
          <th>Description</th>
          <th>Likes</th>
          <th>Date</th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody>
        {blogs.map((blog, i) => (
          <tr key={blog._id} className="text-center">
            <td>{i + 1}</td>
            <td>
              <img
                src={blog.coverImg || replace}
                alt={blog._id}
                width="100"
                height="50"
              />
            </td>
            <td>{blog.title}</td>
            <td>{blog.description.slice(0, 40)}...</td>
            <td>{blog.likes.length}</td>
            <td>
              {new Date(blog.date).toDateString() +
                ", " +
                new Date(blog.date).toLocaleTimeString()}
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

export default BlogTable;
