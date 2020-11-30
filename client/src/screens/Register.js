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
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { isAuth } from "../helpers/auth";
import { HiUserAdd } from "react-icons/hi";
import register from "../assets/register.svg";

const Register = () => {
  const [msg, setMsg] = useState({ color: "", message: "" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password1: "",
    password2: "",
    textChange: (
      <>
        <HiUserAdd fontSize="20" /> Sign Up
      </>
    ),
  });

  const { name, email, password1, password2, textChange } = formData;
  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (name && email && password1) {
      if (password1 === password2) {
        setFormData({
          ...formData,
          textChange: (
            <>
              <Spinner color="light" size="sm" /> Submitting...
            </>
          ),
        });
        axios
          .post(`${process.env.REACT_APP_API_URL}/api/register`, {
            name,
            email,
            password: password1,
          })
          .then(res => {
            setFormData({
              ...formData,
              name: "",
              email: "",
              password1: "",
              password2: "",
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
              name: "",
              email: "",
              password1: "",
              password2: "",
              textChange: "Sign Up",
            });
            console.log(err.response);
            setMsg({
              color: "danger",
              message: err.response.data.errors,
            });
          });
      } else {
        setMsg({
          color: "warning",
          message: "Password doesn't matches!",
        });
      }
    } else {
      setMsg({
        color: "danger",
        message: "Please fill all fields!",
      });
    }
  };

  return (
    <section className="container-fluid">
      {isAuth() ? <Redirect to="/" /> : null}
      <Row className="justify-content-center align-items-center">
        <Col md={6}>
          {(msg.color && msg.message) === "" ? null : (
            <UncontrolledAlert color={msg.color} fade={false}>
              {msg.message}
            </UncontrolledAlert>
          )}
          <Row>
            <Col md={6} className="order-2 order-sm-1">
              <h2 className="text-center">Sign Up</h2>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="name" className="mb-1">
                    Name
                  </Label>
                  <Input
                    className="mb-1 p-2"
                    id="name"
                    type="text"
                    placeholder="Name"
                    onChange={handleChange("name")}
                    value={name}
                  />
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
                  <Label for="password" className="mb-1">
                    Password
                  </Label>
                  <Input
                    className="mb-1 p-2"
                    id="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange("password1")}
                    value={password1}
                  />
                  <Label for="password2" className="mb-1">
                    Confirm Password
                  </Label>
                  <Input
                    className="mb-1 p-2"
                    id="password2"
                    type="password"
                    placeholder="Confirm Password"
                    onChange={handleChange("password2")}
                    value={password2}
                  />
                </FormGroup>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary px-4">
                    {textChange}
                  </button>
                </div>
              </Form>
              <div className="text-center pt-3">
                Already have an account?&nbsp;
                <Link to="/login" className="text-danger">
                  Sign In
                </Link>
              </div>
            </Col>
            <Col md={6} className="order-1 order-sm-2">
              <img src={register} alt="signup" className="img-fluid pb-3" />
            </Col>
          </Row>
        </Col>
      </Row>
    </section>
  );
};

export default Register;
