import React from "react";
import { Container, Row, Col } from "reactstrap";
import LoginForm from "../components/Forms/LoginForm";
import { Link } from "react-router-dom";

const Signin = () => {
  return (
    <Container>
      <Row className="pt-4 justify-content-center align-items-center">
        <Col md={5}>
          <img
            src={require("../assets/auth.svg")}
            alt="..."
            className="img-fluid"
          />
        </Col>
      </Row>
      <Row className="pt-2 justify-content-center align-items-center">
        <Col md={8}>
          <h3 className="text-center">Sign In</h3>
        </Col>
      </Row>
      <Row className="pt-2 justify-content-center align-items-center">
        <Col className="px-4" md={5}>
          <LoginForm />
        </Col>
      </Row>
      <Row className="justify-content-center pb-3 align-items-center">
        <Col md={5}>
          <span className="text-dark">
            <Link to="/">&#8592; back</Link>
          </span>
          <span className="float-right font-weight-bold">
            New Customer?&nbsp;
            <Link to="/register" className="text-danger">
              Create an Account
            </Link>
          </span>
        </Col>
      </Row>
    </Container>
  );
};

export default Signin;
