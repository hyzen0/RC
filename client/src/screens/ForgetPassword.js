import { useState } from "react";
import axios from "axios";
import {
  Col,
  Form,
  FormGroup,
  Row,
  Label,
  Input,
  Spinner,
  UncontrolledAlert,
} from "reactstrap";
import forget from "../assets/forget.svg";

const ForgetPassword = () => {
  const [msg, setMsg] = useState({ color: "", message: "" });
  const [formData, setFormData] = useState({
    email: "",
    textChange: "Submit",
  });
  const { email, textChange } = formData;
  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (email) {
      setFormData({
        ...formData,
        textChange: (
          <>
            <Spinner color="light" size="sm" /> Submitting...
          </>
        ),
      });
      axios
        .put(`${process.env.REACT_APP_API_URL}/api/forgotpassword`, {
          email,
        })
        .then(res => {
          setFormData({
            ...formData,
            email: "",
            textChange: "Submitted",
          });
          setMsg({
            color: "success",
            message: res.data.message,
          });
        })
        .catch(err => {
          setFormData({
            ...formData,
            email: "",
            textChange: "Submit",
          });
          console.log(err.response);
          setMsg({
            color: "danger",
            message: err.response.data.errors,
          });
        });
    } else {
      setMsg({
        color: "danger",
        message: "Please fill all fields!",
      });
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
            <Col md={6} className="order-2 order-sm-1">
              <h2 className="text-center">Forget Password</h2>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="email" className="mb-1">
                    Email
                  </Label>
                  <Input
                    className="mb-1 p-2"
                    id="email"
                    type="email"
                    placeholder="Email"
                    onChange={handleChange("email")}
                    value={email}
                  />
                </FormGroup>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary px-4">
                    {textChange}
                  </button>
                </div>
              </Form>
            </Col>
            <Col md={6} className="order-1 order-sm-2">
              <img src={forget} alt="forget" className="img-fluid pb-3" />
            </Col>
          </Row>
        </Col>
      </Row>
    </section>
  );
};

export default ForgetPassword;
