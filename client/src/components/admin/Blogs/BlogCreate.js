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
import axios from "axios";
import { Link } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { MdNoteAdd } from "react-icons/md";
import { getCookie } from "../../../helpers/auth";

const BlogCreate = ({ history }) => {
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

  const handleSubmit = e => {
    const token = getCookie("token");
    e.preventDefault();
    if (title && description) {
      setFormData({
        ...formData,
        btnText: (
          <>
            <Spinner color="light" size="sm" /> Adding...
          </>
        ),
      });

      axios
        .post(
          `${process.env.REACT_APP_API_URL}/api/blogs/`,
          {
            title,
            description,
            coverImg,
            author,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(res => {
          setFormData({
            ...formData,
            title: "",
            description: "",
            author: "",
            coverImg: "",
            btnText: "Added",
          });

          setMsg({
            color: "success",
            message: (
              <>
                {res.data.msg}! Redirecting to Admin Dashboard&nbsp;
                <Spinner color="success" size="sm" />
              </>
            ),
          });

          setTimeout(() => {
            history.push("/admin/");
          }, 3000);
        })
        .catch(err => {
          setFormData({
            ...formData,
            title: "",
            description: "",
            author: "Admin",
            coverImg: "",
            btnText: (
              <>
                <MdNoteAdd /> Add Blog
              </>
            ),
          });

          console.log(err.response);

          setMsg({
            color: "danger",
            message: err.response.data,
          });

          setTimeout(() => {
            setMsg({ color: "", message: "" });
          }, 3000);
        });
    } else {
      setMsg({
        color: "danger",
        message: "Please fill all the fields!",
      });

      setTimeout(() => {
        setMsg({ color: "", message: "" });
      }, 3000);
    }
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
              <Form onSubmit={handleSubmit}>
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
                  <Label for="content" className="mb-1">
                    Description
                  </Label>
                  <CKEditor
                    editor={ClassicEditor}
                    data={description}
                    className="mb-1 p-2"
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setFormData({ ...formData, description: data });
                    }}
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
