import { useState } from "react";
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Spinner,
  UncontrolledAlert,
} from "reactstrap";
import { Link } from "react-router-dom";
import { MdNoteAdd } from "react-icons/md";

const BlogCreate = () => {
  const [msg, setMsg] = useState({ color: "", message: "" });
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: "Admin",
    coverImg: "",
    btnText: (
      <>
        <MdNoteAdd /> Add blog
      </>
    ),
  });

  const { title, description, author, coverImg, btnText } = formData;

  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  return (
    <section className="container-fluid">
      <Row className="justify-content-center align-items-center">
        <Col md={6}>
          {(msg.color && msg.message) === "" ? null : (
            <UncontrolledAlert color={msg.color} fade={false}>
              {msg.message}
            </UncontrolledAlert>
          )}
          <Row>
            <Col>
              <h2 className="text-center">Add New Blog</h2>
              <Form>
                <FormGroup>
                  <Label for="title" className="mb-1">
                    Title
                  </Label>
                  <Input
                    className="mb-1 p-2"
                    id="title"
                    type="text"
                    placeholder="Blog Title"
                    onChange={handleChange("title")}
                    value={title}
                  />
                  <Label for="author" className="mb-1">
                    Author(Default Admin)
                  </Label>
                  <Input
                    className="mb-1 p-2"
                    id="author"
                    type="text"
                    placeholder="Blog Author(default admin)"
                    onChange={handleChange("author")}
                    value={author}
                  />
                  <Label for="image" className="mb-1">
                    Cover Image
                  </Label>
                  <Input
                    className="mb-1 p-2"
                    id="image"
                    type="file"
                    placeholder="Blog Cover Image"
                    onChange={handleChange("coverImg")}
                    value={coverImg}
                  />
                </FormGroup>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary px-4">
                    {btnText}
                  </button>
                </div>
              </Form>
              <div className="text-center pt-3">
                <Link to="/admin/">Back to Admin Dashboard</Link>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </section>
  );
};

export default BlogCreate;
