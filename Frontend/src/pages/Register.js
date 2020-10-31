import React from "react";
import { Container, Row, Col } from "reactstrap";
import RegisterForm from "../components/Forms/RegisterForm";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <Container>
      <Row className="pt-4 justify-content-center align-items-center">
        <Col md={4}>
          <img
            src={require("../assets/register.svg")}
            alt="..."
            className="img-fluid"
          />
        </Col>
      </Row>
      <Row className="pt-2 justify-content-center align-items-center">
        <Col md={8}>
          <h3 className="text-center">Register</h3>
        </Col>
      </Row>
      <Row className="pt-2 justify-content-center align-items-center">
        <Col className="px-4" md={5}>
          <RegisterForm />
        </Col>
      </Row>
      <Row className="justify-content-center pb-3 align-items-center">
        <Col md={5}>
          <span className="text-dark">
            <Link to="/">&#8592; back</Link>
          </span>
          <span className="float-right font-weight-bold">
            Already have an account?&nbsp;
            <Link to="/signin" className="text-danger">
              Sign In
            </Link>
          </span>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
